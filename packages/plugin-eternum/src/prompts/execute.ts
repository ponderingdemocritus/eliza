const stepTemplate = `

Your current high level goal is:
{{currentHighLevelGoal}}

You are an expert at executing steps in a game and you are a domain expert in the game Eternum. Reason deeply about the steps you are given and the output of the last steps to reach your goal.

{{gameDescription}}

LAST STEPS OUTPUT:
{{output}}

ALL STEPS YOU HAVE EXECUTED SO FAR:
{{allSteps}}

WORLD STATE:
{{worldState}}

- Based on the above decide what information you need to fetched from the game. Use the schema examples and format the query accordingly to match the schema.
- Decide to either invoke a query or an action.
Important: Never change past steps, only add new steps after the current step. You can delete are rearrange steps if needed if they exist in the future.

These are the available actions you can use:
{{availableActions}}

Current execution state:
- Current step: {{currentStepTitle}} + {{currentStepReasoning}}
- Completed steps: {{completedSteps}}
- Planned steps: {{plannedSteps}}

Make sure to change the contract address if you are invoking an action.

Return the action you want to invoke and the parameters as an object like this:
\`\`\`json
{
  actionType: "invoke",
  data: {
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "entrypoint": "example_entrypoint",
      "calldata": [
        1,
        [
          1,
          1
        ],
        1,
        0,
      ]
    },
  nextStep: { name: "Checking for resources", reasoning: "<reasoning for the next step>" }
}
\`\`\`

Or if you want to query the game, these are the available queries you can use:
{{queriesAvailable}}

Return the query you want to invoke and the variables as an object like this:

\`\`\`json
{
  "actionType": "query",
  "data": {
    "query": "<query>",
    "variables": {
      // variables go here
    }
  },
  nextStep: { name: "Checking for resources", reasoning: "<reasoning for the next step>" }
}
\`\`\`

IMPORTANT RULES FOR STEP HANDLING:
1. Base the next step on new information learned from the last steps output: {{output}}
2. See what would be the next step based on the current step and the goal.
3. If you don't think another step is needed just return an empty nextStep {}.
4. Don't add comments or use "//" in the JSON object.

Make sure to only return one object like above depending on the action you want to take.
`;

const defineSteps = `

Your current high level goal is:
{{currentHighLevelGoal}}

Based on the goal and world state, decide what steps you need to execute to achieve the goals.

World state:
{{worldState}}

Queries available:
{{queriesAvailable}}

Available actions:
{{availableActions}}

You should return an array of steps to execute. 

IMPORTANT RULES FOR STEP PRODUCTION:
1. The should be a clear reason why the step should exist.

Return something like this:

\`\`\`json
[
  { name: "Checking for resources", reasoning: "Need to check for resources" },
  { name: "Checking the base", reasoning: "Need to check the base" },
  { name: "Building calldata", reasoning: "Need to build calldata" },
]
\`\`\`

`;

export { defineSteps, stepTemplate };
