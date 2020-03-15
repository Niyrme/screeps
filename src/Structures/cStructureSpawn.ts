import { ROLES_ALL } from "Config/Constants";

export class GetMin {
	private spawnMem: SpawnMemory;
	private role: string;
	constructor(spawnName: string, role:string) {
		this.spawnMem = Game.spawns[spawnName].memory;
		this.role = role;
	}

	public getMin(): number {
		let min = 0;

		switch (this.role) {
			case ROLES_ALL.ROLE_ARCHITECT:
				min = this.spawnMem.minArchitects!;
				break;
			case ROLES_ALL.ROLE_BUILDER:
				min = this.spawnMem.minBuilders!;
				break;
			case ROLES_ALL.ROLE_CARRIER:
				min = this.spawnMem.minCarriers!;
				break;
			case ROLES_ALL.ROLE_HARVESTER:
				min = this.spawnMem.minHarvesters!;
				break;
			case ROLES_ALL.ROLE_MINER:
				min = this.spawnMem.minMiners!;
				break;
			case ROLES_ALL.ROLE_REPAIRER:
				min = this.spawnMem.minRepairers!;
				break;
			case ROLES_ALL.ROLE_REPAIRER:
				min = this.spawnMem.minWallRepairers!;
				break;
			case ROLES_ALL.ROLE_UPGRADER:
				min = this.spawnMem.minUpgraders!;
				break;

			default:
				min = 0;
				break;
		}

		return min;
	}
}
