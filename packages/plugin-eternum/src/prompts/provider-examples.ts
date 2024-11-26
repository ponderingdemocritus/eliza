export const PROVIDER_EXAMPLES = `

Use these to call functions.

IMPORTANT RULES:
1. If you receive an error, you may need to try again, the error message should tell you what went wrong.

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

*

Parameters:
- entity_id: ID of the entity creating the building
- directions: Array of directions for building placement
- building_category: Category of building to create
- produce_resource_type: Type of resource the building will produce
- signer: Account executing the transaction

Note - this is how you determine the coordinates of the building:
The building is a flat hexagon grid.
- There is a castle at (10,10) - you can't build here ever.
- East = 1
- NorthEast = 2
- NorthWest = 3
- West = 4
- SouthWest = 5
- SouthEast = 6

Make sure to include the { Some: 1 } in the call data for the resource type. Farms and fishing villages are always 0.

Example:
* // Create a wood production building at coordinates determined by directions [1,2]
   * {
   *   contractAddress: "<eternum-building_systems>",
   *   entrypoint: "create",
   *   calldata: [
   *     123,     // entity_id
   *     [1],// Building east of castle
   *     1,       // building_category (e.g. 1 for resource production)
   *     {
   *       Some: 1 // resource type (wood) Farms and fishing villages are always 0
   *     },
   *   ]
   * }
   *
`;
