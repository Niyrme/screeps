import { Role } from "Creeps/Roles/Role";

export class RoleMiner extends Role {

	constructor(creepName: string) {
		super(creepName);
	}

	runCreep() : void {
		if (!this.creep.memory.sourceID) {
			console.log(`Creep ${this.creep.name} is missing the sourceID property in it's memory!`);
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const source: Source | null = Game.getObjectById(this.creep.memory.sourceID!);
		let container: StructureContainer | undefined;
		if (source) {
			container = source.pos.findInRange(FIND_STRUCTURES, 1, {
				filter: s => s.structureType == STRUCTURE_CONTAINER
			})[0] as StructureContainer | undefined;
		}

		if (container && source) {
			if (this.creep.pos.isEqualTo(container.pos)) {
				this.creep.harvest(source);
			}
			else {
				this.creep.moveTo(container);
			}
		}
	}
}
