// Roles
export const ROLE_ARCHITECT: string = "architect"; // Taking resources from Tombstones, Ruins, Graves, etc. TODO better name
export const ROLE_BUILDER: string = "builder";
export const ROLE_CARRIER: string = "carrier";
export const ROLE_HARVESTER: string = "harvester";
export const ROLE_MINER: string = "miner";
export const ROLE_REPAIRER: string = "repairer";
export const ROLE_SCOUT: string = "scout";
export const ROLE_ROAMER: string = "roamer"; // Claimer and Reserver
export const ROLE_UPGRADER: string = "upgrader";

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
