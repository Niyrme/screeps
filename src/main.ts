import { ErrorMapper } from "utils/ErrorMapper";
import { MANAGERS } from "Managers/Exports";

declare global {
	interface SpawnMemory {
		minerSource?: string;
	}

	interface CreepMemory {
		role: string;
		isWorking?: boolean;

		target?: string;
		mode?: string;
		sourceID?: Id<Source>;
		room?: string;
	}

	interface RoomMemory {
		mins: Array<{
			name: string;
			count: number;
		}>;

		creepMaxParts?: number;

		claimRoom?: string;
		reserveRoom?: string;

		towersRepair?: boolean;
		towersRepairWalls?: boolean;
	}


	interface Memory {
		uuid: number;
		log: any;
		randomData: any;
	}

	interface TemplateCreep {
		role: string;

		bodyType: string;
		body: Array<BodyPartConstant>;

		creepClass: any;
		mode?: string;
	}

	namespace NodeJS {
		interface Global {
			log: any;
		}
	}

}

export const loop = ErrorMapper.wrapLoop(() => {
	for (let manager of MANAGERS) {
		manager.manage();
	}
});
