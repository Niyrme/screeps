import { RoleRepairer } from "Creeps/Roles/RoleRepairer";

export class RoleWallRepairer extends Role {

	constructor(creepName: string) {
		super(creepName)
	}

	runCreep() {
		if (this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == 0) {
			this.creep.memory.isWorking = false;
		}
		else if (!this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == this.creep.store.getCapacity(RESOURCE_ENERGY)) {
			this.creep.memory.isWorking = true;
		}

		if (this.creep.memory.isWorking) {
			let structure = undefined;
			let walls = this.creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_WALL });
			for (let perc = 0.0001; perc <= 1; perc += 0.0001) {
				walls.forEach(wall => {
					if ((wall.hits / wall.hitsMax) < perc) {
						structure = wall;
					}
				});

				if (structure != undefined) { break; }
			}

			if (structure != undefined) {
				if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(structure);
				}
			}
			else {
				new RoleRepairer(this.creep.name).runCreep();
			}
		}
		else {
			let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0 });

			if (container != undefined) {
				if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(container);
				}
			}
			else {
				var source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source | undefined | null;
				if (source) {
					if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(source);
					}
				}
			}
		}
	}
}
