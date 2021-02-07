import { cStructureTower } from "Structures/Exports";

export class ManagerStructures extends Manager {
	manage() {
		for (let r in Game.rooms) {
			let room: Room = Game.rooms[r];
			for (let structure in Game.structures) {
				if (Game.structures[structure].structureType == STRUCTURE_TOWER) {
					let t = new cStructureTower(Game.structures[structure] as StructureTower);
					let enemyCreeps: Creep[] | undefined = t.tower.room.find(FIND_HOSTILE_CREEPS);
					
					if (enemyCreeps.length > 0) {
						t.attack();
					}
					else {
						t.heal();
						if ( room.memory.towersRepair && (t.tower.store[RESOURCE_ENERGY] >= t.tower.store.getCapacity(RESOURCE_ENERGY) / 2) ) {
							t.repair(room.memory.towersRepairWalls);
						}
					}

				}
			}
		}
	}
}
