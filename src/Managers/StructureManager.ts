import { cStructureTower } from "Structures/Exports";
import { Manager } from "Managers/Manager";

export class ManagerStructures extends Manager {
	manage() : void {
		for (const r in Game.rooms) {
			const room: Room = Game.rooms[r];
			for (const structure in Game.structures) {
				if (Game.structures[structure].structureType == STRUCTURE_TOWER) {
					new cStructureTower(Game.structures[structure] as StructureTower, room).manage();
				}
			}
		}
	}
}
