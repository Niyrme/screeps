export class RoleMiner extends Role {

	constructor(creepName: string) {
		super(creepName)
	}

	runCreep() {
		let container = undefined;
		let source = Game.getObjectById(`${this.creep.memory.sourceID}`) as Source | undefined | null;
		if (source) {
			container = source.pos.findInRange(FIND_STRUCTURES, 1, {
				filter: s => s.structureType == STRUCTURE_CONTAINER
			})[0] as StructureContainer | undefined | null;
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
