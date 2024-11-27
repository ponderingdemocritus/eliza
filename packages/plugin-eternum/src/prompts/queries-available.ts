export const AVAILABLE_QUERIES = `
# Eternum GraphQL Query Guide

## Overview
This guide helps you query information about the Eternum game using GraphQL. Follow the structured approach below to build effective queries.

## Quick Start Guide
1. Find the realm's entity_id using the realm_id
2. Get the realm's position (x, y coordinates)
3. Query specific information using the entity_id and coordinates

## Common Queries

### 1. Get Realm Information
Use this to find a realm's entity_id and level:
\`\`\`graphql
query GetRealmInfo($realmId: Int!) {
  eternumRealmModels(where: { realm_id: $realmId }) {
    edges {
      node {
        ... on eternum_Realm {
          entity_id
          level
        }
      }
    }
  }
}
\`\`\`

### 2. Get Realm Position
After getting the entity_id, find the realm's coordinates:
\`\`\`graphql
query GetRealmPosition($entityId: String!) {
  eternumPositionModels(where: { entity_id: $entityId }, limit: 1) {
    edges {
      node {
        ... on eternum_Position {
          x
          y
        }
      }
    }
  }
}
\`\`\`

### 3. Get Realm Resources and Buildings
Query both resources and buildings in one call:
\`\`\`graphql
query GetRealmDetails($entityId: String!, $x: Int!, $y: Int!) {
  eternumResourceModels(where: { entity_id: $entityId }, limit: 100) {
    edges {
      node {
        ... on eternum_Resource {
          resource_type
          balance
        }
      }
    }
  }
  eternumBuildingModels(where: { outer_col: $x, outer_row: $y }) {
    edges {
      node {
        ... on eternum_Building {
          category
          entity_id
          inner_col
          inner_row
        }
      }
    }
  }
}
\`\`\`

## Schema Introspection
To explore available fields for any model:
\`\`\`graphql
query IntrospectModel($modelName: String!) {
  __type(name: $modelName) {
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
\`\`\`

## Important Guidelines
1. Always use entity_id in queries unless specifically searching by realm_id
2. Use limit parameters to control result size
3. Include proper type casting in variables
4. Follow the nested structure: Models → edges → node → specific type

## Available Models
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

## Best Practices
1. Always validate entity_id before querying
2. Use pagination for large result sets
3. Include only necessary fields in your queries
4. Handle null values appropriately
`;
