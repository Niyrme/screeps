import {
	TEMPLATE_CREEPS as Templates
} from "Config/Templates/CreepTemplates";
import { Manager } from "Managers/Manager";

export class ManagerCreeps extends Manager {
	manage() {
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
