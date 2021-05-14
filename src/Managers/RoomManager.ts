import { CreepFactory } from "Creeps/CreepFactory";
import { Manager } from "Managers/Manager";

export class ManagerRooms extends Manager {
	manage() : void {
		for (const r in Game.rooms) {
			const room: Room = Game.rooms[r];
			new CreepFactory(room).spawnCreeps();
		}
	}
}
