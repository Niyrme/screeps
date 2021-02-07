// Roles
const ROLE_ARCHITECT: string = "architect"; // Taking resources from Tombstones, Ruins, Graves, etc. TODO better name (?)
const ROLE_BUILDER: string = "builder";
const ROLE_CARRIER: string = "carrier";
const ROLE_HARVESTER: string = "harvester";
const ROLE_MINER: string = "miner";
const ROLE_REPAIRER: string = "repairer";
const ROLE_ROAMER: string = "roamer"; // Claimer and Reserver
const ROLE_UPGRADER: string = "upgrader";
const ROLE_WALL_REPAIRER: string = "wallRepairer";

// All roles sorted by spawn priority (not that it matters atm)
enum ROLES_ALL {
	ROLE_MINER = "miner",
	ROLE_HARVESTER = "harvester",
	ROLE_UPGRADER = "upgrader",
	ROLE_CARRIER = "carrier",
	ROLE_REPAIRER = "repairer",
	ROLE_BUILDER = "builder",
	ROLE_ARCHITECT = "architect",
	ROLE_ROAMER = "roamer",
	ROLE_WALL_REPAIRER = "wallRepairer",
};

enum CREEP_MEMORY {
	MODE_CLAIM = "claim",
	MODE_RESERVE = "reserve",
};

enum SPAWN_CONSTANTS {
	MODE_SINGLE = "single",
	MODE_MULTI = "multi",
}

const ROLES: Array<string> = [
	ROLE_MINER,
	ROLE_HARVESTER,
	ROLE_UPGRADER,
	ROLE_CARRIER,
	ROLE_REPAIRER,
	ROLE_BUILDER,
	ROLE_ARCHITECT,
	ROLE_ROAMER,
	ROLE_WALL_REPAIRER,
];

export {
	ROLE_ARCHITECT,
	ROLE_BUILDER,
	ROLE_CARRIER,
	ROLE_HARVESTER,
	ROLE_MINER,
	ROLE_REPAIRER,
	ROLE_ROAMER,
	ROLE_UPGRADER,
	ROLE_WALL_REPAIRER
}
export {
	ROLES_ALL,
	CREEP_MEMORY,
	SPAWN_CONSTANTS
}
export { ROLES }
