// NOTE unused
import { Role } from "Creeps/Roles/Role";

export class RoleScout extends Role {

	constructor(creepName: string) {
		super(creepName)
	}

	runCreep() {
		if (this.creep.memory.isWorking) { }
		else { }
	}
}
