export class RoleHarvester {

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
			let structure = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: s => ( s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY) }) as StructureSpawn | StructureExtension | StructureTower | StructureStorage | undefined | null;

			if (!structure) {
				structure = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
					filter: s =>
					s.structureType == STRUCTURE_TOWER
					&& (s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY))
				}) as StructureTower | undefined | null;
			}
			if (!structure) { structure = this.creep.room.storage; }

			if (structure) {
				if (this.creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(structure);
				}
			}
		}
		else {
			if (this.creep.memory.target != undefined) {
				if (this.creep.room.name != this.creep.memory.target) {
					let exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = this.creep.room.findExitTo(this.creep.memory.target);
					if (exit > 0) { // No Error
						let closest = this.creep.pos.findClosestByPath(exit as ExitConstant)
						if (closest) { // Found an exit
							this.creep.moveTo(closest);
						}
					}
				}
				else {
					this.creep.memory.target = undefined;
				}
			}
			else {
				let source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source | undefined | null;
				if (source) {
					if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
						if (this.creep.moveTo(source) == ERR_NO_PATH || this.creep.moveTo(source) == ERR_INVALID_TARGET) {
							this.creep.memory.isWorking = true;
						}
					}
				}
			}
		}
	}
}
