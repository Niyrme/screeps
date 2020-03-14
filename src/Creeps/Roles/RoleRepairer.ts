import { CREEP_MEMORY } from "Config/Constants";

import { RoleCarrier } from "Creeps/Roles/RoleCarrier";

export class RoleRepairer {

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
			let structure = undefined;
			if (this.creep.memory.mode !== CREEP_MEMORY.MODE_REPAIR_WALLS) {
				let walls = this.creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_WALL });
				for (let perc = 0.0001; perc <= 1; perc += 0.0001) {
					for (let wall of walls) {
						if (wall.hits / wall.hitsMax < perc) {
							structure = wall;
						}
						else { break; }
					}

					if (structure != undefined) { break; }
				}
				structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ( (s.hits / s.hitsMax) <= 0.75) && s.structureType != STRUCTURE_WALL } );
			}
			else {
				structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ( (s.hits / s.hitsMax) <= 0.75) && s.structureType == STRUCTURE_WALL } );
			}			
			if (structure) {
				if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(structure);
				}
			}
			else {
				new RoleCarrier(this.creep.name).runCreep();
			}
		}
		else {
			let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0 });

			if (container) {
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
