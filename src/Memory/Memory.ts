export class MemoryManager {
  static clean() {
    this.cleanCreeps();
  }

  private static cleanCreeps() {
    for (let name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }
}
