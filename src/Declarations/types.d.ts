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
	mins: Array<MemoryMin>;

	creepMaxParts?: number;

	claimRoom?: string;
	reserveRoom?: string;

	towersRepair?: boolean;
	towersRepairWalls?: boolean;
}

interface MemoryMin {
	name: string;
	count: number;
}

interface Memory {
	uuid: number;
	log: any;
	randomData: any;
}

interface TemplateCreep {
	role: string;

	bodyType: string;
	body: BodyPartConstant[];

	creepClass: any;
	mode?: string;
}

// `global` extension samples
declare namespace NodeJS {
	interface Global {
		log: any;
	}
}
