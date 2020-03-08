export class RoleRoamer {

  private creep: Creep;
  constructor(creepName: string) {
    this.creep = Game.creeps[creepName];
  }

  // TODO FIXME
  public runCreep() {/*
    if (this.creep.memory.mode == "claim") {
      if (this.creep.room.name != this.creep.memory.target) {
        if (this.creep.memory.target) {
          let exit = this.creep.room.findExitTo(this.creep.memory.target);
          if (exit) {
            this.creep.moveTo(this.creep.pos.findClosestByPath(exit));
          }
        }
      }
      else {
        if (this.creep.claimController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.creep.room.controller);
        }
      }
    }
    else if (this.creep.memory.mode == "reserve") {
      if (this.creep.room.name != this.creep.memory.target) {
  			let exit = this.creep.room.findExitTo(this.creep.memory.target);
  			this.creep.moveTo(this.creep.pos.findClosestByPath(exit));
  		}
  		else {
  			if (this.creep.reserveController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.creep.room.controller);
        }
  		}
    }*/
  }
}
