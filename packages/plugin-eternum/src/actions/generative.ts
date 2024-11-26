import {
    ActionExample,
    elizaLogger,
    generateObject,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    type Action,
} from "@ai16z/eliza";
import { Call } from "starknet";
import { validateStarknetConfig } from "../enviroment";
import { defineSteps, stepTemplate } from "../prompts/execute";
import { PROVIDER_EXAMPLES } from "../prompts/provider-examples";
import { AVAILABLE_QUERIES } from "../prompts/queries-available";
import { WORLD_GUIDE } from "../prompts/world-guide";
import { WORLD_STATE } from "../prompts/world-state";
import { callEternum, fetchData, getRealmState } from "../providers";
import { EternumState } from "../types";
import { composeContext } from "../utils";

interface Step {
    name: string;
    reasoning: string;
}

interface StepsContent {
    steps: Array<Step>;
}

export default {
    name: "GENERATE",
    similes: ["GAME_ACTION"],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        elizaLogger.log("Validating Starknet configuration...");
        await validateStarknetConfig(runtime);
        elizaLogger.success("Starknet configuration validated successfully");
        return true;
    },
    description: `If a user asks you to do something that is related to this ${WORLD_GUIDE}, use this action to generate a plan to do it.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: EternumState,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting GENERATE handler...");
        elizaLogger.log(`Processing message ID: ${message.id}`);

        // Initialize or update state
        elizaLogger.log("Initializing/updating state...");
        if (!state) {
            elizaLogger.log("No existing state found, creating new state");
            state = (await runtime.composeState(message, {
                gameDescription: WORLD_GUIDE,
                worldState: WORLD_STATE,
                queriesAvailable: AVAILABLE_QUERIES,
                availableActions: PROVIDER_EXAMPLES,
            })) as EternumState;
            elizaLogger.success("New state created successfully");
        } else {
            elizaLogger.log("Updating existing state");
            state = (await runtime.updateRecentMessageState(state, {
                gameDescription: WORLD_GUIDE,
                worldState: WORLD_STATE,
                queriesAvailable: AVAILABLE_QUERIES,
                availableActions: PROVIDER_EXAMPLES,
                currentHighLevelGoal: message.content.text,
            })) as EternumState;
            elizaLogger.success("State updated successfully", state);
        }

        const handleStepError = (step: string) => {
            elizaLogger.error(`Error generating ${step} content`);
            elizaLogger.error(`Step execution failed at: ${step}`);
            if (callback) {
                elizaLogger.log("Executing error callback");
                callback({
                    text: "Unable to process transfer request",
                    content: {
                        worldState: state.worldState,
                        error: `Failed during ${step} step`,
                    },
                });
            }
            return true;
        };

        // First, get the steps from the model
        elizaLogger.log("Generating initial steps...");
        const context = composeContext({
            state,
            template: defineSteps,
        });

        // elizaLogger.log("Context composed, generating content...", context);
        const stepsContent: StepsContent = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.MEDIUM,
        });

        console.log("stepsContent", stepsContent);

        callback?.({
            text: `Processing steps: ${JSON.stringify(stepsContent, null, 2)}`,
            content: {
                worldState: state.worldState,
                steps: stepsContent,
            },
        });

        elizaLogger.log("stepsContent", JSON.stringify(stepsContent, null, 2));
        if (!stepsContent) {
            elizaLogger.error("Failed to generate steps content");
            return handleStepError("steps definition");
        }

        // Parse the steps returned by the model
        let modelDefinedSteps: Array<{
            name: string;
            template: string;
        }>;

        const generateStep = async (
            step: Step,
            state: EternumState
        ): Promise<
            | {
                  actionType: "invoke" | "query" | "getRealmState";
                  data: string;
                  nextStep: Step;
              }
            | boolean
        > => {
            elizaLogger.log(`Generating step with template: ${step.name}...`);

            const context = composeContext({
                state,
                template: stepTemplate,
            });

            // elizaLogger.log("Context composed, generating content...", context);
            const content = await generateObject({
                runtime,
                context,
                modelClass: ModelClass.MEDIUM,
            });
            // elizaLogger.success("Step content generated successfully", content);

            if (typeof content === "string") {
                try {
                    // Enhanced sanitization of the JSON string
                    const sanitizedContent = content
                        .replace(/[\x00-\x1F\x7F-\x9F]/g, "") // Remove control characters
                        .replace(/\\[^"\/bfnrtu]/g, "\\\\") // Escape invalid escape sequences
                        .replace(/\u0000-\u0019/g, ""); // Remove ASCII control characters

                    try {
                        return JSON.parse(sanitizedContent);
                    } catch (parseError) {
                        elizaLogger.error("JSON Parse Error:", parseError);
                        elizaLogger.error(
                            "Sanitized Content:",
                            sanitizedContent
                        );
                        return false;
                    }
                } catch (e) {
                    elizaLogger.error("Content Sanitization Error:", e);
                    return false;
                }
            }

            return content;
        };

        try {
            if (!Array.isArray(stepsContent)) {
                throw new Error("Steps must be an array");
            }
        } catch (e) {
            elizaLogger.error("Failed to parse steps:", e);
            return handleStepError("steps parsing");
        }

        state = (await runtime.composeState(message, {
            ...state,
            allSteps: [...stepsContent],
            currentStepTitle: stepsContent[0].name,
            currentStepReasoning: stepsContent[0].reasoning,
        })) as EternumState;

        // Execute each step
        let currentSteps = [...stepsContent];
        let stepIndex = 0;

        // Execute steps dynamically
        elizaLogger.log("Beginning step execution...");
        while (stepIndex < currentSteps.length) {
            const step = currentSteps[stepIndex];
            elizaLogger.log(`Executing step: ${step.name}`);
            const content = await generateStep(step, state);

            elizaLogger.log("content", JSON.stringify(content, null, 2));

            let output: string = "";

            if (!content) {
                elizaLogger.error(
                    `Step ${step.name} failed to generate content`
                );
                return handleStepError(step.name);
            }

            // Process action type and get output
            if (typeof content === "object" && "actionType" in content) {
                if (content.actionType === "invoke") {
                    elizaLogger.log("Invoking action...");

                    elizaLogger.log(
                        "Invoking action: " +
                            JSON.stringify(content.data, null, 2)
                    );

                    output =
                        "Invoked with this response: " +
                        (await callEternum(
                            runtime,
                            content.data as unknown as Call
                        ));
                } else if (content.actionType === "query") {
                    elizaLogger.log("Querying...");

                    //  TODO: Types
                    const contentData =
                        typeof content.data === "string"
                            ? JSON.parse(content.data)
                            : content.data;

                    const data = await fetchData(
                        contentData.query,
                        contentData.variables
                    );
                    output =
                        "Successfully queried: " +
                        JSON.stringify(content.data) +
                        "returned: " +
                        JSON.stringify(data, null, 2);

                    elizaLogger.log("output", output);
                } else if (content.actionType === "getRealmState") {
                    elizaLogger.log("Getting realm state...");
                    const realmState = await getRealmState(
                        content.data as unknown as number
                    );
                    output = "Realm state: " + realmState;
                }
            }

            // Handle next step insertion
            if (
                typeof content === "object" &&
                "nextStep" in content &&
                content.nextStep &&
                Object.keys(content.nextStep).length > 0
            ) {
                elizaLogger.log(
                    `Inserting next step after current step: ${step.name}`
                );
                const nextStepIndex = stepIndex + 1;
                if (
                    nextStepIndex >= currentSteps.length ||
                    currentSteps[nextStepIndex].name !== content.nextStep.name
                ) {
                    currentSteps.splice(stepIndex + 1, 0, content.nextStep);
                }
            }

            // Update state with current progress
            const nextStep = currentSteps[stepIndex + 1];

            console.log(currentSteps);
            state = (await runtime.composeState(message, {
                ...state,
                allSteps: currentSteps,
                currentStepTitle: nextStep?.name || null,
                currentStepReasoning: nextStep?.reasoning || null,
                output,
            })) as EternumState;

            elizaLogger.success(`Step ${step.name} completed successfully`);

            callback?.({
                text: `Thinking: ${step.name} - ${step.reasoning}`,
                content: {
                    worldState: state.worldState,
                    steps: currentSteps,
                },
            });

            stepIndex++;
        }
        // TODO: After this happens we need to evaluate how the action went
        // and if it was successful or not. If it was succesful we should store it in memory as an action to do xyz. This way
        // we know this action works for the task.

        const handleStepSuccess = () => {
            elizaLogger.success(
                `Action completed successfully. Steps executed: ${JSON.stringify(currentSteps, null, 2)}`
            );
            if (callback) {
                elizaLogger.log("Executing success callback");
                callback({
                    text: "Action completed successfully",
                    content: {
                        worldState: state.worldState,
                        steps: modelDefinedSteps,
                    },
                });
            }
            return true;
        };

        return handleStepSuccess();
    },

    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you build me a Realm/house/castle/tower?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Sure thing! I'll get started on that right away.",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Buy me some gold?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Sure thing! I'll get started on that right away.",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
