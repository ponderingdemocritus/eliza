export const PROVIDER_EXAMPLES = `

Use these to call functions.

IMPORTANT RULES:
1. If you receive an error, you may need to try again, the error message should tell you what went wrong.
2. To verify a successful transaction, read the response you get back. You don't need to query anything.

create_order
============

*

Parameters:
- maker_id: ID of the realm creating the trade
- maker_gives_resources: Resources the maker is offering
- taker_id: ID of the realm that can accept the trade
- taker_gives_resources: Resources requested from the taker
- signer: Account executing the transaction
- expires_at: When the trade expires

Example:
* // Use realm 123 to create a trade offering 100 wood for 50 stone. Expires at timestamp 1704067200 (example timestamp). Maker is realm 123, taker is realm 456.
   * {
   *   contractAddress: "<eternum-trade_systems>",
   *   entrypoint: "create_order",
   *   calldata: [
   *     123, // maker_id
   *     1,   // maker_gives_resources.length / 2 (1 resource type)
   *     1,   // resource type (wood)
   *     100, // amount
   *     456, // taker_id
   *     1,   // taker_gives_resources.length / 2 (1 resource type)
   *     2,   // resource type (stone)
   *     50,  // amount
   *     1704067200 // expires_at (example timestamp)
   *   ]
   * }
   *

accept_order
============

*

Parameters:
- taker_id: ID of the realm accepting the trade
- trade_id: ID of the trade being accepted
- maker_gives_resources: Resources the maker is offering
- taker_gives_resources: Resources requested from the taker
- signer: Account executing the transaction

Example:
* {
   *   contractAddress: "<eternum-trade_systems>",
   *   entrypoint: "accept_order",
   *   calldata: [
   *     123, // taker_id
   *     789, // trade_id
   *     1,   // maker_gives_resources.length / 2 (1 resource type)
   *     1,   // resource type (wood)
   *     100, // amount
   *     1,   // taker_gives_resources.length / 2 (1 resource type)
   *     2,   // resource type (stone)
   *     50   // amount
   *   ]
   * }
   *

accept_partial_order
====================

*

Parameters:
- taker_id: ID of the realm accepting the trade
- trade_id: ID of the trade being accepted
- maker_gives_resources: Resources the maker is offering
- taker_gives_resources: Resources requested from the taker
- taker_gives_actual_amount: Actual amount taker will give
- signer: Account executing the transaction

Example:
* {
   *   contractAddress: "<eternum-trade_systems>",
   *   entrypoint: "accept_partial_order",
   *   calldata: [
   *     123, // taker_id
   *     789, // trade_id
   *     1,   // maker_gives_resources.length / 2 (1 resource type)
   *     1,   // resource type (wood)
   *     100, // amount
   *     1,   // taker_gives_resources.length / 2 (1 resource type)
   *     2,   // resource type (stone)
   *     50,  // amount
   *     25   // taker_gives_actual_amount
   *   ]
   * }
   *

cancel_order
============

*

Parameters:
- trade_id: ID of the trade to cancel
- return_resources: Resources to return
- signer: Account executing the transaction

Example:
* {
   *   contractAddress: "<eternum-trade_systems>",
   *   entrypoint: "cancel_order",
   *   calldata: [
   *     789, // trade_id
   *     1,   // return_resources.length / 2 (1 resource type)
   *     1,   // resource type (wood)
   *     100  // amount
   *   ]
   * }
   *
create_building
===============

Creates a new building for a realm on the hexagonal grid map.

Parameters:
- entity_id: ID of the realm creating the building
- directions: Array of directions from castle to building location
- building_category: Type of building (1 = resource production, 2 = military, etc)
- produce_resource_type: Resource type ID this building will produce (required for resource buildings) - This should be greater than 0 always.

Building Placement:
The map uses a hexagonal grid with the realm's castle at the center. Buildings are placed by specifying directions from the castle:
- 0: East 
- 1: Northeast
- 2: Northwest  
- 3: West
- 4: Southwest
- 5: Southeast

Important Notes:
- Cannot build on castle location
- Resource type must be > 0 for resource production buildings
- Farms (food) and fishing villages use resource type 0
- Building location is determined by following the directions array from the castle
- Higher realm levels allow building further from castle
- Always include at least 1 as the final

RESOURCE IDS
Stone = 1,
Coal = 2,
Wood = 3,
Copper = 4,
Ironwood = 5,
Obsidian = 6,
Gold = 7,
Silver = 8,
Mithral = 9,
AlchemicalSilver = 10,
ColdIron = 11,
DeepCrystal = 12,
Ruby = 13,
Diamonds = 14,
Hartwood = 15,
Ignium = 16,
TwilightQuartz = 17,
TrueIce = 18,
Adamantine = 19,
Sapphire = 20,
EtherealSilica = 21,
Dragonhide = 22,
AncientFragment = 29,
Donkey = 249,
Knight = 250,
Crossbowman = 251,
Paladin = 252,
Lords = 253,
Wheat = 254,
Fish = 255,

Example - Create a wood production building northeast of castle:
* {
   *   contractAddress: "<eternum-building_systems>",
   *   entrypoint: "create", 
   *   calldata: [
   *     123,    // entity_id - ID of the realm
   *     [1],    // directions - [1] means build northeast of castle
   *     1,      // building_category - 1 for resource production
   *     1       // produce_resource_type - 1 for wood production
   *   ]
   * }
   *
`;
