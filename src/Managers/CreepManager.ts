import { CreepFactory } from "Creeps/CreepFactory";

import {
	TEMPLATE_CREEPS as Templates
} from "Config/Templates/CreepTemplates";
import { template } from "lodash";

export class ManagerCreeps extends Manager {
	manage() {
		CreepFactory.spawnCreeps();

		for (let creep in Game.creeps) {
			let creepName = Game.creeps[creep].name;
			let creepRole = Game.creeps[creep].memory.role;

			Templates.forEach(template => {
				if (creepRole == template.role) {
					new template.creepClass(creepName).runCreep();
				}
			});
		}
	}
}
