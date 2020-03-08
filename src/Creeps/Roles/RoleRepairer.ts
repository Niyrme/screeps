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
      var structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (
          (s.hits / s.hitsMax) <= 0.75)
          && s.structureType != STRUCTURE_WALL
        });

      if (structure) {
        if (this.creep.repair(structure) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(structure);
        }
      }
    }
    else {
      let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s =>
        s.structureType == STRUCTURE_CONTAINER
        && s.store[RESOURCE_ENERGY] > 0
      });

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
