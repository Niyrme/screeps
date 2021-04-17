import { cStructureTower } from "Structures/Exports";
import { Manager } from "Managers/Manager";

export class ManagerStructures extends Manager {
	manage() {
		for (let r in Game.rooms) {
			let room: Room = Game.rooms[r];
			for (let structure in Game.structures) {
				if (Game.structures[structure].structureType == STRUCTURE_TOWER) {
					new cStructureTower(Game.structures[structure] as StructureTower, room).manage();
				}
			}
		}
	}
}
