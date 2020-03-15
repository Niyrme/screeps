export class RoleUpgrader {

	private creep: Creep;
	constructor(creepName: string) {
		this.creep = Game.creeps[creepName];
	}

	public runCreep() {
		if (this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == 0) {
			this.creep.memory.isWorking = false;
		}
		else if (!this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == this.creep.store.getCapacity(RESOURCE_ENERGY)) {
			this.creep.memory.isWorking = true;
		}

		if (this.creep.memory.isWorking) {
			if (this.creep.room.controller) {
				if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(this.creep.room.controller);
				}
			}
		}
		else {
			let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: s => ( s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 250 /* Not worth getting energy from structures with 250 or less energy. also waste of lifetime */
			}) as StructureContainer | StructureStorage  | undefined | null;

			if (container) {
				if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(container);
				}
			}
			else {
				let source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source | undefined | null;
				if (source) {
					if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(source);
					}
				}
			}
		}
	}
}
