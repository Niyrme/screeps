import { ROLES_ALL } from "Config/Constants";

const getMin = (spawn: StructureSpawn, role: string) => {
	let min = 0;

	switch (role) {
		case ROLES_ALL.ROLE_ARCHITECT:
			min = spawn.memory.minArchitects!;
			break;
		case ROLES_ALL.ROLE_BUILDER:
			min = spawn.memory.minBuilders!;
			break;
		case ROLES_ALL.ROLE_CARRIER:
			min = spawn.memory.minCarriers!;
			break;
		case ROLES_ALL.ROLE_HARVESTER:
			min = spawn.memory.minHarvesters!;
			break;
		case ROLES_ALL.ROLE_MINER:
			min = spawn.memory.minMiners!;
			break;
		case ROLES_ALL.ROLE_REPAIRER:
			min = spawn.memory.minRepairers!;
			break;
		case ROLES_ALL.ROLE_UPGRADER:
			min = spawn.memory.minUpgraders!;
			break;
		case ROLES_ALL.ROLE_WALL_REPAIRER:
			min = spawn.memory.minWallRepairers!;
			break;
		default:
			break;
	}

	return min;
}

export { getMin }
