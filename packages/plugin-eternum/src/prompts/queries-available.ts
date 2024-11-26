export const AVAILABLE_QUERIES = `
Use this to query for information about the game. 

YOU MUST FOLLOW THESE STEPS:
1. Introspect the schema with the following, replace the model name. You should do this if you don't know the fields available to a model.
2. With the understanding of the schema, create a query using the structure that exists

For all transactions you will need the entity_id of the realm you are building on which you can get with the following query:

query {
  eternumRealmModels (where: {realm_id: 6671}) {
    edges {
      node {
        ... on eternum_Realm {
          entity_id
        }
      }
    }
  }
}

This is a graphql query example, you can see the structure that exists, then dynamically create queries.
{
  eternumAcceptOrderModels	 {
    edges {
      node {
        ... on eternum_AcceptOrder {
          taker_id
          maker_id
        }
      }
    }
  }
}

This is how you introspect the schema, replace the model name.

query {
  __type(name: "eternum_AcceptOrder") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}

AVAILABLE MODELS:

eternum_AcceptOrder
eternum_AcceptPartialOrder
eternum_AddressName
eternum_Army
eternum_Army_Troops
eternum_ArrivalTime
eternum_Bank
eternum_Battle
eternum_BattleClaimData
eternum_BattleConfig
eternum_BattleJoinData
eternum_BattleLeaveData
eternum_BattlePillageData
eternum_BattlePillageData_Troops
eternum_BattlePillageData_u8u128
eternum_BattleStartData
eternum_Battle_BattleArmy
eternum_Battle_BattleHealth
eternum_Battle_Troops
eternum_Building
eternum_BuildingCategoryPopConfig
eternum_BuildingConfig
eternum_BuildingGeneralConfig
eternum_BuildingQuantityv2
eternum_BurnDonkey
eternum_CancelOrder
eternum_CapacityCategory
eternum_CapacityConfig
eternum_Contribution
eternum_CreateGuild
eternum_CreateOrder
eternum_DetachedResource
eternum_EntityName
eternum_EntityOwner
eternum_Epoch
eternum_Epoch_ContractAddressu16
eternum_FragmentMineDiscovered
eternum_GameEnded
eternum_Guild
eternum_GuildMember
eternum_GuildWhitelist
eternum_Health
eternum_Hyperstructure
eternum_HyperstructureCoOwnersChange
eternum_HyperstructureCoOwnersChange_ContractAddressu16
eternum_HyperstructureConfig
eternum_HyperstructureContribution
eternum_HyperstructureContribution_u8u128
eternum_HyperstructureFinished
eternum_HyperstructureResourceConfig
eternum_JoinGuild
eternum_LevelingConfig
eternum_Liquidity
eternum_LiquidityEvent
eternum_Liquidity_Fixed
eternum_MapConfig
eternum_MapExplored
eternum_MapExplored_u8u128
eternum_Market
eternum_Market_Fixed
eternum_MercenariesConfig
eternum_MercenariesConfig_u8u128
eternum_Message
eternum_Movable
eternum_Orders
eternum_OwnedResourcesTracker
eternum_Owner
eternum_Population
eternum_PopulationConfig
eternum_Position
eternum_Production
eternum_ProductionDeadline
eternum_ProductionInput
eternum_ProductionOutput
eternum_Progress
eternum_Protectee
eternum_Protector
eternum_Quantity
eternum_QuantityTracker
eternum_Quest
eternum_QuestBonus
eternum_QuestConfig
eternum_Realm
eternum_RealmLevelConfig
eternum_RealmMaxLevelConfig
eternum_Resource
eternum_ResourceAllowance
eternum_ResourceBridgeConfig
eternum_ResourceBridgeFeeSplitConfig
eternum_ResourceBridgeWhitelistConfig
eternum_ResourceCost
eternum_ResourceTransferLock
eternum_Season
eternum_SettleRealmData
eternum_SettlementConfig
eternum_SpeedConfig
eternum_Stamina
eternum_StaminaConfig
eternum_StaminaRefillConfig
eternum_Status
eternum_Structure
eternum_StructureCount
eternum_StructureCount_Coord
eternum_SwapEvent
eternum_TickConfig
eternum_Tile
eternum_Trade
eternum_Transfer
eternum_Transfer_u8u128
eternum_Travel
eternum_TravelFoodCostConfig
eternum_TravelStaminaCostConfig
eternum_Travel_Coord
eternum_TroopConfig
eternum_TrophyCreation
eternum_TrophyCreation_Task
eternum_TrophyProgression
eternum_Weight
eternum_WeightConfig
eternum_WorldConfig



`;
