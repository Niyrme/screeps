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
			let source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source | undefined | null;
			if (source) {
				if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(source);
				}
			}
		}
	}
}
