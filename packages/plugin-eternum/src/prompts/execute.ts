const stepTemplate = `

Your current high level goal is:
{{currentHighLevelGoal}}

You are executing steps in Eternum to achieve your goal. Review the previous outputs and steps to determine the next action.

LAST STEPS OUTPUT:
{{output}}

ALL STEPS EXECUTED:
{{allSteps}}

WORLD STATE:
{{worldState}}

GAME DESCRIPTION:
{{gameDescription}}

You must return ONE of the following response formats:

1. To execute a contract call:
\`\`\`json
{
  "actionType": "invoke",
  "data": {
    "contractAddress": "<contract_address>",
    "entrypoint": "<function_name>", 
    "calldata": []
  },
  "nextStep": {
    "name": "Step name",
    "reasoning": "Why this is the next step"
  }
}
\`\`\`

2. To query game state:
\`\`\`json
{
  "actionType": "query", 
  "data": {
    "query": "<graphql_query>",
    "variables": {}
  },
  "nextStep": {
    "name": "Step name",
    "reasoning": "Why this is the next step"
  }
}
\`\`\`

AVAILABLE ACTIONS:
{{availableActions}}

AVAILABLE QUERIES:
{{queriesAvailable}}

EXECUTION STATE:
Current step: {{currentStepTitle}} - {{currentStepReasoning}}
Completed: {{completedSteps}}
Planned: {{plannedSteps}}

RULES:
1. Return exactly ONE response object
2. Base next step on the output of previous steps
3. Do not include comments in JSON
4. If no next step is needed, use "nextStep": {}
5. Always use actual values, never placeholders like <contract_address>
6. Query for information before executing transactions
7. Verify costs and requirements before building
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
2. Never use // comments within the json as it will break the json.
3. Only return steps that are needed to achieve the goal, and base this on the knowledge of the game. You don't need to query for costs or requirements to build a building, just use the knowledge of the game.
4. If you a step fails - keep going.
5. Never go further than 10 steps
6. Always replace <inserts> with the actual values. This is essential for contract addresses and other values that are dynamic.
7. Never include the same step twice, unless you have a good reason to do so.
8. Never do a transaction to check something, only do transactions to execute actions. User Queries 

IMPORTANT LOGIC:
1. You should always verify the cost of actions before executing them.
2. You should always verify the requirements needed to build a building before executing the action.

IMPORT LOGIC IN RETURNING STEPS:
1. Only return name and reasoning in the json, never include other fields.
2. Always replace <inserts> with the actual values. This is essential for contract addresses and other values that are dynamic.
3. If in doubt, just return an empty step - it's better to err on the side of caution, then to just keep going forever.

\`\`\`json
[
  { name: "Checking for resources", reasoning: "Need to check for resources" },
  { name: "Checking the base", reasoning: "Need to check the base" },
  { name: "Building calldata", reasoning: "Need to build calldata" },
]
\`\`\`

`;

export { defineSteps, stepTemplate };
