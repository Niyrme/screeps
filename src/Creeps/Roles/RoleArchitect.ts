export class RoleArchitect {

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
			let structure = this.creep.room.storage as StructureStorage | undefined;
			if ((structure != undefined) && (this.creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
				this.creep.moveTo(structure);
			}
		}
		else {
			this.creep.room.find(FIND_TOMBSTONES).forEach(grave => {
				if ((grave.store[RESOURCE_ENERGY] > 0) && (this.creep.withdraw(grave, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
					this.creep.moveTo(grave);
				}
				else { this.creep.memory.isWorking = true; }
			});

			this.creep.room.find(FIND_RUINS).forEach(ruin => {
				if ((ruin.store[RESOURCE_ENERGY] > 0) && (this.creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
					this.creep.moveTo(ruin);
				}
				else { this.creep.memory.isWorking = true; }
			});
		}
	}
}