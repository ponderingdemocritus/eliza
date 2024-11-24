export const GAME_DESCRIPTION = `
Eternum is a browser-based game where you manage a realm and its resources.

To build a Realm you need the required resources. Which are:
- 2500 Wood
- 1800 Stone
- 3000 Gold
- 1200 Food
- 500 Iron

To upgrade your Realm to Level 2 you need:
- 5000 Wood
- 3600 Stone
- 6000 Gold
- 2400 Food
- 1000 Iron

To build a Military Academy you need:
- 3000 Wood
- 2500 Stone
- 4000 Gold
- 1500 Food
- 800 Iron

To construct a Market you need:
- 2000 Wood
- 1500 Stone
- 5000 Gold
- 1000 Food
- 300 Iron
`;

export const WORLD_STATE = `You have:

Resources:
- 3000 Wood
- 1800 Stone
- 3000 Gold
- 1200 Food
- 500 Iron

Standing Army:
- 150 Swordsmen
- 75 Archers 
- 25 Cavalry
- 10 Siege Weapons
- 5 War Elephants`;

export const AVAILABLE_QUERIES = `Available GraphQL Queries:

query GetResources {
  resources(playerId: "123") {
    wood
    stone 
    gold
    food
  }
}

query GetBaseMap {
  baseMap(playerId: "123") {
    tiles {
      x
      y
      type
      building {
        id
        type
        level
      }
    }
  }
}

query GetMarketPrices {
  market {
    resources {
      name
      buyPrice
      sellPrice
      volume24h
    }
  }
}`;
export const AVAILABLE_ACTIONS = `Available Actions:

Create Realm:
- Creates a new realm with the specified ID
- Example calldata:
{
  contractAddress: "realm",
  entrypoint: "create_realm",
  calldata: [
    realm_id,
    "0x1a3e37c77be7de91a9177c6b57956faa6da25607e567b10a25cf64fea5e533b"
  ]
}

Upgrade Realm:
- Upgrades a realm to the next level
- Example calldata:
{
  contractAddress: "realm",
  entrypoint: "upgrade_realm", 
  calldata: [
    realm_entity_id
  ]
}

Set Entity Name:
- Sets the name for a specific entity
- Example calldata:
{
  contractAddress: "entity",
  entrypoint: "set_name",
  calldata: [
    entity_id,
    name
  ]
}`;
