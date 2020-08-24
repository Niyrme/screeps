import { CreepFactory } from "Creeps/CreepFactory";

import {
	TEMPLATE_CREEPS as Templates
} from "Config/Templates/CreepTemplates";

export class CreepManager {

	static manageCreeps() {
		CreepFactory.spawnCreeps();
		this.runCreeps();
	}

	private static runCreeps() {
		for (let creep in Game.creeps) {
			let creepName = Game.creeps[creep].name;
			let creepRole = Game.creeps[creep].memory.role;

			for (let template in Templates) {
				if (creepRole == Templates[template].role) {
					new Templates[template].creepClass(creepName).runCreep();
				}
			}
		}
	}
}
