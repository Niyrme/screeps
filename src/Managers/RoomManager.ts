import { CreepFactory } from "Creeps/CreepFactory";
import { Manager } from "Managers/Manager";

export class ManagerRooms extends Manager {
	manage() {
		for (let r in Game.rooms) {
			let room: Room = Game.rooms[r];
			new CreepFactory(room).spawnCreeps();
		}
	}
}