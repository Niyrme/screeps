import { Role } from "Creeps/Roles/Role";
import { RoleRepairer } from "Creeps/Roles/RoleRepairer";

export class RoleBuilder extends Role{

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
			const constructionSite = this.creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
			if (constructionSite) {
				if (this.creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(constructionSite);
				}
			}
			else {
				new RoleRepairer(this.creep.name).runCreep();
			}
		}
		else {
			if (this.creep.memory.target != undefined && this.creep.room.name != this.creep.memory.target) {
				const exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = this.creep.room.findExitTo(this.creep.memory.target);
				if (exit > 0) { // No Error
					const closest = this.creep.pos.findClosestByPath(exit as ExitConstant)
					if (closest) { // Found an exit
						this.creep.moveTo(closest);
						}
					}
				}


			else {
				if (this.creep.memory.target != undefined) { this.creep.memory.target = undefined; }
				const storageStructure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: s => (
					s.structureType == STRUCTURE_CONTAINER
					|| s.structureType == STRUCTURE_STORAGE)
					&& s.store[RESOURCE_ENERGY] >= 500
				}) as StructureContainer | StructureStorage | undefined | null;

				if (storageStructure) {
					if (this.creep.withdraw(storageStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(storageStructure);
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
}
