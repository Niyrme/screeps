import { Role } from "Creeps/Roles/Role";

export class RoleMiner extends Role {

	constructor(creepName: string) {
		super(creepName)
	}

	runCreep() {
		if (!this.creep.memory.sourceID) {
			console.log(`Creep ${this.creep.name} is missing the sourceID property in it's memory!`);
		}
		let source: Source | null = Game.getObjectById(this.creep.memory.sourceID!) as Source | null;
		let container = undefined;
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
