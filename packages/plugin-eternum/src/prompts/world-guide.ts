export const WORLD_GUIDE = `WORLD GUIDE

Contract Addresses:
- eternum-trade_systems: 0x1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF
- eternum-building_systems: 0x36b82076142f07fbd8bf7b2cabf2e6b190082c0b242c6ecc5e14b2c96d1763c

Buying a Resource
1. Look at the market data -> fetch with eternum_Orders
2. Then accept an order with the correct eternum_AcceptOrder model

Building a Building
1. Check what buildings you have with eternum_Building and locations
2. If you don't have the building, check the cost with eternum_BuildingCost passing in the building id
3. If you have enough resources, use eternum_CreateBuilding to build the building

BUILDING COSTS
Market: 750000 Fish, 125000 Stone, 50000 Obsidian, 25000 Ruby, 5000 DeepCrystal
Barracks: 1000000 Wheat, 75000 Wood, 75000 Coal, 50000 Silver, 45000 Gold
Archery Range: 1000000 Fish, 75000 Wood, 75000 Obsidian, 25000 Gold, 25000 Hartwood
Stable: 1000000 Wheat, 75000 Wood, 75000 Silver, 35000 Ironwood, 25000 Gold
Workers Hut: 300000 Wheat, 75000 Stone, 75000 Wood, 75000 Coal
Storehouse: 1000000 Fish, 75000 Coal, 75000 Stone, 10000 Sapphire
Farm: 450000 Fish
Fishing Village: 450000 Wheat

BUILDING POPULATION
// this is the amount of population each building adds to your realm. You need to have enough population free to support the building. You can check your current population with eternum_Population
None: 0
Castle: 0
Bank: 0
Fragment Mine: 0
Resource: 2
Farm: 1
Fishing Village: 1
Barracks: 2
Market: 3
Archery Range: 2
Stable: 3
Trading Post: 2
Workers Hut: 0
Watch Tower: 2
Walls: 2
Storehouse: 2

REALM LEVELS
Realm levels determine the maximum distance you can build buildings from the center of your realm.
Settlement (1) = 6 buildable hexes - starting realm level
City (2) = 18 buildable hexes, requires 3000k Wheat and 3000k Fish
Kingdom (3) = Requires:
- 600k ColdIron
- 600k Hartwood  
- 600k Diamonds
- 600k Sapphire
- 600k DeepCrystal
- 5000k Wheat
- 5000k Fish

Empire (4) = Requires:
- 50k AlchemicalSilver
- 50k Adamantine
- 50k Mithral 
- 50k Dragonhide
- 9000k Wheat
- 9000k Fish


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

BUILDING DESCRIPTIONS: You can build buildings anywhere within your realm.
Castle: Where the heart of your realm beats, the Castle is the foundation of your kingdom.
Bank: Banks, where the wealth of the land flows, store the riches of your realm.
Fragment Mine: Fragment Mines, where the earth's magic is harnessed, produce Ancient Fragments.
Resource: Resource buildings, harnessing the land's magic, produce essential resources.
Farm: Enchanted Farms, blessed by Gaia, yield golden wheat.
Fishing Village: Mystical Fishing Villages, guided by the Moon, harvest the bounty of the seas of Fish
Barracks: Barracks, where valor and magic intertwine, train noble Knights.
Market: Markets, bustling with arcane traders, summon Donkeys for mystical trading.
Archery Range: Archery Ranges, under the watchful eyes of elven masters, train Crossbow men.
Stable: Stables, infused with ancient spirits, summon valiant Paladins.
Trading Post: Trading Posts, at the crossroads of destiny, expand the horizons of trade.
Workers Hut: Workers Huts, blessed by the ancestors, expand the heart of your realm allowing for greater capacity.
Watch Tower: Watch Towers, piercing the veils of fog, extend the gaze of your kingdom.
Walls: Walls, imbued with the strength of titans, fortify your domain against the shadows.
Storehouse: Storehouses, where abundance flows, swell with the wealth of the land.

 
1. get position of realm and the outer x and y coordinates
2. query the buildings that exist out x and y coordinates


BUILDING TYPES
None = 0
Castle = 1
Resource = 2
Farm = 3
Fishing Village = 4
Barracks = 5
Market = 6
Archery Range = 7
Stable = 8
Trading Post = 9
Workers Hut = 10
Watch Tower = 11
Walls = 12
Storehouse = 13
Bank = 14
Fragment Mine = 15


`;
