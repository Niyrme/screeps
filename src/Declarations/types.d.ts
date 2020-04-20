interface SpawnMemory {
	minArchitects?: number;
	minBuilders?: number;
	minCarriers?: number;
	minHarvesters?: number;
	minMiners?: number;
	minRepairers?: number;
	minWallRepairers?: number;
	minUpgraders?: number;

	minerSource?: string;

	claimRoom?: string;
	reserveRoom?: string;

	towersRepair?: boolean;
	towersRepairWalls?: boolean;

	doDBG?: boolean;

	creepMaxParts?: number;
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
	randomData: any;
}

interface TemplateCreep {
	name: string;
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
