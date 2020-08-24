import {
	ROLES_ALL as Roles
} from "Config/Constants";

const getMin = (spawn: StructureSpawn, role: string) => {
	let min = 0;

	switch (role) {
		case Roles.ROLE_ARCHITECT:
			min = spawn.memory.minArchitects!;
			break;
		case Roles.ROLE_BUILDER:
			min = spawn.memory.minBuilders!;
			break;
		case Roles.ROLE_CARRIER:
			min = spawn.memory.minCarriers!;
			break;
		case Roles.ROLE_HARVESTER:
			min = spawn.memory.minHarvesters!;
			break;
		case Roles.ROLE_MINER:
			min = spawn.memory.minMiners!;
			break;
		case Roles.ROLE_REPAIRER:
			min = spawn.memory.minRepairers!;
			break;
		case Roles.ROLE_UPGRADER:
			min = spawn.memory.minUpgraders!;
			break;
		case Roles.ROLE_WALL_REPAIRER:
			min = spawn.memory.minWallRepairers!;
			break;
		default:
			break;
	}

	return min;
}

export { getMin }
