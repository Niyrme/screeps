// Roles
export const ROLE_ARCHITECT = "architect"; // Taking resources from Tombstones, Ruins, Graves, etc. TODO better name
export const ROLE_BUILDER = "builder";
export const ROLE_CARRIER = "carrier";
export const ROLE_HARVESTER = "harvester";
export const ROLE_MINER = "miner";
export const ROLE_REPAIRER = "repairer";
export const ROLE_SCOUT = "scout";
export const ROLE_ROAMER = "roamer"; // Claimer and Reserver
export const ROLE_UPGRADER = "upgrader";

// All roles sorted by spawn priority (not that it matters atm)
export enum ROLES_ALL {
  ROLE_MINER = "miner",
  ROLE_HARVESTER = "harvester",
  ROLE_UPGRADER = "upgrader",
  ROLE_CARRIER = "carrier",
  ROLE_REPAIRER = "repairer",
  ROLE_BUILDER = "builder",
  ROLE_ARCHITECT = "architect",
  ROLE_ROAMER = "roamer",
  ROLE_SCOUT = "scout",
};

export enum CREEP_MEMORY {
	MODE_CLAIM = "claim",
	MODE_RESERVE = "reserve",
	MODE_REPAIR_WALLS = "repairWalls",
};

export enum SPAWN_CONSTANTS {
	MODE_SINGLE = "single",
	MODE_MULTI = "multi",
}

export const ROLES = [
	ROLE_MINER,
	ROLE_HARVESTER,
	ROLE_UPGRADER,
	ROLE_CARRIER,
	ROLE_REPAIRER,
	ROLE_BUILDER,
	ROLE_ARCHITECT,
	ROLE_ROAMER,
	ROLE_SCOUT,
];
