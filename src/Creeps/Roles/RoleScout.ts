// NOTE unused
export class RoleScout {

  private creep: Creep;
  constructor(creepName: string) {
    this.creep = Game.creeps[creepName];
  }

  public runCreep() {

    if (this.creep.memory.isWorking) { }
    else { }
  }
}
