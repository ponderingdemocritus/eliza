export const PROVIDER_EXAMPLES = `

Use these to call functions.

IMPORTANT RULES:
1. If you receive an error, you may need to try again, the error message should tell you what went wrong.
2. To verify a successful transaction, read the response you get back. You don't need to query anything.

create_order
============

Parameters:
- maker_id: ID of the realm creating the trade
- maker_gives_resources: Resources the maker is offering
- taker_id: ID of the realm that can accept the trade
- taker_gives_resources: Resources requested from the taker
- signer: Account executing the transaction
- expires_at: When the trade expires

Example:
\`\`\`json
{
  "contractAddress": "<eternum-trade_systems>",
  "entrypoint": "create_order",
  "calldata": [
    123,         
    1,           
    1,           
    100,         
    456,         
    1,           
    2,           
    50,          
    1704067200   
  ]
}
\`\`\`

accept_order
============

Parameters:
- taker_id: ID of the realm accepting the trade
- trade_id: ID of the trade being accepted
- maker_gives_resources: Resources the maker is offering
- taker_gives_resources: Resources requested from the taker
- signer: Account executing the transaction

Example:
\`\`\`json
{
  "contractAddress": "<eternum-trade_systems>",
  "entrypoint": "accept_order",
  "calldata": [
    123,
    789,
    1,
    1,
    100,
    1,
    2,
    50
  ]
}
\`\`\`

accept_partial_order
====================

Parameters:
- taker_id: ID of the realm accepting the trade
- trade_id: ID of the trade being accepted
- maker_gives_resources: Resources the maker is offering
- taker_gives_resources: Resources requested from the taker
- taker_gives_actual_amount: Actual amount taker will give
- signer: Account executing the transaction

Example:
\`\`\`json
{
  "contractAddress": "<eternum-trade_systems>",
  "entrypoint": "accept_partial_order",
  "calldata": [
    123,
    789,
    1,
    1,
    100,
    1,
    2,
    50,
    25
  ]
}
\`\`\`

cancel_order
============

Parameters:
- trade_id: ID of the trade to cancel
- return_resources: Resources to return
- signer: Account executing the transaction

Example:
\`\`\`json
{
  "contractAddress": "<eternum-trade_systems>",
  "entrypoint": "cancel_order",
  "calldata": [
    789,
    1,
    1,
    100
  ]
}
\`\`\`

create_building
===============

Creates a new building for a realm on the hexagonal grid map.

Parameters:
- entity_id: ID of the realm creating the building (required)
- directions: Array of directions from castle to building location (required)
- building_category: Type of building (required)
- produce_resource_type see below: Resource type ID this building will produce (required for resource buildings)
  - Never use 0 for this always use the resource type ID - eg: fish is 1, wheat is 1, etc.

Building Placement Guide:
The map uses a hexagonal grid with your realm's castle at the center (0,0). Buildings are placed by specifying directions outward from the castle:

Direction IDs:
0 = East (→)
1 = Northeast (↗) 
2 = Northwest (↖)
3 = West (←)
4 = Southwest (↙) 
5 = Southeast (↘)

Key Rules:
1. Cannot build on castle location (0,0)
2. Building distance from castle is limited by realm level
3. Each direction in the array represents one hex step from castle
4. Location is determined by following directions sequentially

Resource Type IDs:
Basic Resources:
- Stone (1)
- Coal (2) 
- Wood (3)
- Copper (4)
- Ironwood (5)
- Obsidian (6)

Precious Resources:
- Gold (7)
- Silver (8)
- Mithral (9)
- AlchemicalSilver (10)
- ColdIron (11)

Rare Resources:
- DeepCrystal (12)
- Ruby (13)
- Diamonds (14)
- Hartwood (15)
- Ignium (16)
- TwilightQuartz (17)
- TrueIce (18)
- Adamantine (19)
- Sapphire (20)
- EtherealSilica (21)
- Dragonhide (22)

Special Resources:
- AncientFragment (29)
- Donkey (249)
- Knight (250)
- Crossbowman (251)
- Paladin (252)
- Lords (253)
- Wheat (1)
- Fish (1)

Example - Create a wood production building one hex northeast of castle:

\`\`\`json
{
  "contractAddress": "<eternum-building_systems>",
  "entrypoint": "create",
  "calldata": [
    123,
    [1],
    1,
    3
  ]
}
\`\`\`

`;
