import { TEMPLATE_CREEPS } from "Config/Templates/CreepTemplates";
import { Manager } from "Managers/Manager";

export class ManagerMemory extends Manager {
	manage() {
		this.checkMemory();
		this.cleanAll();
	}

	private checkMemory() {
		this.checkGlobalMemory();
		this.checkRoomMemory();
	}

	private checkGlobalMemory() {
		if (!Memory.randomData) {
			console.log("Missing randomData memory. Creating...");
			console.log("Please change the player property in Memory.randomData to your username!");
			Memory.randomData = {
				player: " ",
			};
		}
	}
	private checkRoomMemory() {
		for (let r in Game.rooms) {
			let roomMemory: RoomMemory = Game.rooms[r].memory;
			if (!roomMemory.mins) {
				roomMemory.mins = [];
			}
			TEMPLATE_CREEPS.forEach(t => {
				if (_.filter(roomMemory.mins, (m) => ((m.name) == t.role)).length != 1) {
					roomMemory.mins.push({
						name: t.role,
						count: 0,
					});
				}
			});
			if (!roomMemory.towersRepair) {
				roomMemory.towersRepair = false;
			}
			if (!roomMemory.towersRepairWalls) {
				roomMemory.towersRepairWalls = false;
			}
		}
	}

	private cleanAll() {
		this.cleanCreeps();
	}

	private cleanCreeps() {
		for (let name in Memory.creeps) {
			if (!(name in Game.creeps)) {
				delete Memory.creeps[name];
			}
		}
	}
}
