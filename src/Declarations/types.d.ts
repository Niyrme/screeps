interface SpawnMemory {
	minArchitects?: number;
	minBuilders?: number;
	minCarriers?: number;
	minHarvesters?: number;
	minMiners?: number;
	minRepairers?: number;
	minUpgraders?: number;
	minerSource?: string;

	towersRepair?: boolean;
	towersRepairWalls?: boolean;

	doDBG?: boolean;
}

interface CreepMemory {
	role: string;
	isWorking?: boolean;

	target?: string;
	mode?: string;
	sourceID?: string;
	room?: string;
}

interface Memory {
	uuid: number;
	log: any;
}

// `global` extension samples
declare namespace NodeJS {
	interface Global {
		log: any;
	}
}
