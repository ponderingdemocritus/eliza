import {
    elizaLogger,
    generateObject,
    IAgentRuntime,
    ModelClass,
} from "@ai16z/eliza";
import { composeContext } from ".";
import { stepTemplate } from "../prompts/execute";
import { EternumState, Step } from "../types";

export const parseStepContent = (content: string) => {
    // Advanced string sanitization function
    const sanitizeJSON = (str: string): string => {
        let result = str;

        // Fix common JSON issues
        result = result
            // Remove any non-printable characters
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            // Fix escaped quotes inside strings
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\")
            // Remove multiple spaces
            .replace(/\s+/g, " ")
            // Fix unescaped quotes
            .replace(/(?<!\\)"/g, '\\"')
            // Fix trailing commas in objects and arrays
            .replace(/,\s*([\]}])/g, "$1")
            // Remove BOM and other Unicode markers
            .replace(/^\uFEFF/, "")
            // Ensure proper string termination
            .replace(/([^"\\])"([^"]*$)/g, '$1"')
            // Remove invalid escape sequences
            .replace(/\\[^"\\\/bfnrtu]/g, "");

        // Attempt to balance quotes
        const quoteCount = (result.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
            result = result + '"';
        }

        console.log("sanitized", result);

        return result;
    };

    try {
        // First attempt: direct parse
        try {
            const parsedContent = JSON.parse(content);
            elizaLogger.log("Successfully parsed content directly");
            return parsedContent;
        } catch (initialError) {
            // Second attempt: with sanitization
            const sanitizedContent = sanitizeJSON(content);
            try {
                const parsedContent = JSON.parse(sanitizedContent);
                elizaLogger.log("Successfully parsed sanitized content");
                return parsedContent;
            } catch (sanitizedError) {
                // Third attempt: try to extract valid JSON
                elizaLogger.warn(
                    "Attempting to extract valid JSON structure..."
                );
                const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (jsonMatch) {
                    const extractedJson = sanitizeJSON(jsonMatch[0]);
                    try {
                        const parsedContent = JSON.parse(extractedJson);
                        elizaLogger.log("Successfully parsed extracted JSON");
                        return parsedContent;
                    } catch (extractError) {
                        throw new Error("Failed to parse extracted JSON");
                    }
                }
                throw new Error("No valid JSON structure found");
            }
        }
    } catch (error) {
        elizaLogger.error("All JSON parsing attempts failed:", error);
        elizaLogger.error("Original content:", content);

        // Return a safe fallback response
        return {
            actionType: "FAIL",
            data: "PARSING_ERROR",
            nextStep: {
                name: "Error Recovery",
                reasoning:
                    "Failed to parse step data. Proceeding with safe fallback.",
                priority: 0,
                dependencies: [],
                query: "",
            },
        };
    }
};

export const generateStep = async (
    step: Step,
    state: EternumState,
    runtime: IAgentRuntime
): Promise<
    | {
          actionType: "invoke" | "query" | "FAIL";
          data: string;
          nextStep: Step;
      }
    | boolean
> => {
    elizaLogger.log(`Generating step with template: ${step.name}...`);

    try {
        const context = composeContext({
            state,
            template: stepTemplate,
        });

        elizaLogger.success("context", context);

        const content = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.MEDIUM,
        });

        if (typeof content === "string") {
            return parseStepContent(content);
        }

        return (
            content || {
                actionType: "FAIL",
                data: "INVALID_CONTENT",
                nextStep: {
                    name: "Error Recovery",
                    reasoning:
                        "Invalid content received. Proceeding with safe fallback.",
                },
            }
        );
    } catch (error) {
        elizaLogger.error("Critical error in generateStep:", error);
        return {
            actionType: "FAIL",
            data: "CRITICAL_ERROR",
            nextStep: {
                name: "Error Recovery",
                reasoning:
                    "Critical error occurred. Proceeding with safe fallback.",
                priority: 0,
                dependencies: [],
                query: "",
            },
        };
    }
};
