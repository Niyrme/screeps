import { CREEP_MEMORY } from "Config/Constants";

export class RoleRoamer {

  private creep: Creep;
  constructor(creepName: string) {
    this.creep = Game.creeps[creepName];
  }

  // TODO FIXME
  public runCreep() {
    if (this.creep.memory.mode == CREEP_MEMORY.MODE_CLAIM) {
      if (this.creep.room.name != this.creep.memory.target) {
        if (this.creep.memory.target) {
          let exit = this.creep.room.findExitTo(this.creep.memory.target);
          if (exit) {
//TODO            this.creep.moveTo(this.creep.pos.findClosestByPath(exit));
          }
        }
      }
      else {
				let controller: StructureController | undefined = this.creep.room.controller;
				if (controller) {
					if (this.creep.claimController(controller) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(controller);
					}
				}
      }
    }
    else if (this.creep.memory.mode == CREEP_MEMORY.MODE_RESERVE) {
      if (this.creep.room.name != this.creep.memory.target) {
				if (this.creep.memory.target) {
					let exit = this.creep.room.findExitTo(this.creep.memory.target);
//TODO					this.creep.moveTo(this.creep.pos.findClosestByPath(exit));
				}
  		}
  		else {
				let controller: StructureController | undefined = this.creep.room.controller;
				if (controller) {
					if (this.creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(controller);
					}
				}
  		}
    }
  }
}
