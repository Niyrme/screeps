import { Role } from "Creeps/Roles/Role";
import { RoleUpgrader } from "Creeps/Roles/RoleUpgrader";

export class RoleRepairer extends Role {

	constructor(creepName: string) {
		super(creepName);
	}

	runCreep() : void {
		if (this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == 0) {
			this.creep.memory.isWorking = false;
		}
		else if (!this.creep.memory.isWorking && this.creep.store[RESOURCE_ENERGY] == this.creep.store.getCapacity(RESOURCE_ENERGY)) {
			this.creep.memory.isWorking = true;
		}

		if (this.creep.memory.isWorking) {
			const structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ( (s.hits / s.hitsMax) <= 0.90) && s.structureType != STRUCTURE_WALL } );

			if (structure != undefined) {
				if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(structure);
				}
			}
			else {
				new RoleUpgrader(this.creep.name).runCreep();
			}
		}
		else {
			const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0 });

			if (container != undefined) {
				if (this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(container);
				}
			}
			else {
				const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source | undefined | null;
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
