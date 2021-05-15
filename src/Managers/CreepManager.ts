import {
	TEMPLATE_CREEPS as Templates
} from "Config/Templates/CreepTemplates";
import { Manager } from "Managers/Manager";

export class ManagerCreeps extends Manager {
	manage() : void {
		for (const creep in Game.creeps) {
			const creepName = Game.creeps[creep].name;
			const creepRole = Game.creeps[creep].memory.role;

			Templates.forEach(template => {
				if (creepRole == template.role) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
					new template.creepClass(creepName).runCreep();
				}
			});
		}
	}
}
