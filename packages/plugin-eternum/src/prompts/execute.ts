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
8. Never go past 10 steps - if you do, you're probably doing too much, return an empty step.
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

OBJECTIVE:
Return a precise sequence of steps to achieve the given goal. Each step must be actionable and directly contribute to the goal.

STEP VALIDATION RULES:
1. Each step must have a clear, measurable outcome
2. Maximum 10 steps per sequence
3. Steps must be non-redundant unless explicitly required
4. All dynamic values (marked with <>) must be replaced with actual values
5. Use queries for information gathering, transactions for actions only

REQUIRED VALIDATIONS:
1. Resource costs must be verified before action execution
2. Building requirements must be confirmed before construction
3. Entity existence must be validated before interaction

OUTPUT FORMAT:
Return a JSON array where each step contains:
- name: Clear, action-oriented step name
- reasoning: Concise explanation of why this step is necessary
- priority: Number 1-5 (1 being highest priority)
- dependencies: Array of step names that must complete first

Example response:
\`\`\`json
[
  {
    "name": "QueryRealmResources",
    "reasoning": "Need to verify available resources before planning construction",
    "priority": 1,
    "dependencies": []
  },
  {
    "name": "ValidateBuildingRequirements",
    "reasoning": "Must confirm realm meets level and position requirements",
    "priority": 2,
    "dependencies": ["QueryRealmResources"]
  }
]
\`\`\`

ERROR HANDLING:
- If a step fails, continue with remaining steps if they're not dependent
- If critical information is missing, return empty step array with reasoning
- If goal appears unachievable, explain why in reasoning

OPTIMIZATION GUIDELINES:
1. Batch similar queries where possible
2. Prioritize information gathering before actions
3. Consider resource efficiency in step ordering
4. Validate prerequisites early to fail fast
`;

export { defineSteps, stepTemplate };
