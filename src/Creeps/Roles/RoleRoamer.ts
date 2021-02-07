import { CREEP_MEMORY } from "Config/Constants";
import { Role } from "Creeps/Roles/Role";

export class RoleRoamer extends Role {

	constructor(creepName: string) {
		super(creepName)
	}

	runCreep() {
		if (this.creep.memory.target) {
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
				let controller: StructureController | undefined = this.creep.room.controller;
				if (controller) {
					if (this.creep.memory.mode == CREEP_MEMORY.MODE_CLAIM) {
						if (this.creep.claimController(controller) == ERR_NOT_IN_RANGE) {
							this.creep.moveTo(controller);
						}
					}
					else if (this.creep.memory.mode == CREEP_MEMORY.MODE_RESERVE) {
						if (this.creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
							this.creep.moveTo(controller);
						}
					}
				}
			}
		}
		else {
			console.log(`ERROR! CREEP '${this.creep.name.toUpperCase()}' MISSING TARGET!`);
		}
	}
}
