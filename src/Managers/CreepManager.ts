import { CreepFactory } from "Creeps/CreepFactory";

import { TEMPLATE_CREEPS } from "Config/Templates/Templates";

export class CreepManager {

  static manageCreeps() {
    CreepFactory.spawnCreeps();
    this.runCreeps();
  }

  private static runCreeps() {
    for (let creep in Game.creeps) {
      let creepName = Game.creeps[creep].name;
      let creepRole = Game.creeps[creep].memory.role;

			for (let template in TEMPLATE_CREEPS) {
				if (creepRole == TEMPLATE_CREEPS[template].role) {
					new TEMPLATE_CREEPS[template].creepClass(creepName).runCreep();
				}
			}
    }
  }
}
