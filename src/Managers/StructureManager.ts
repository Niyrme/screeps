import { cStructureTower } from "Structures/cStructureTower";

export class StructureManager {
	static manageStructures() {
		for (let spawnName in Game.spawns) {
			for (let structure in Game.structures) {
				if (Game.structures[structure].structureType == STRUCTURE_TOWER) { this.manageTowers(Game.structures[structure] as StructureTower, Game.spawns[spawnName]); }
			}
		}
	}

	private static manageTowers(tower: StructureTower, spawn: StructureSpawn): void {
		let enemyCreeps: Creep[] | undefined = tower.room.find(FIND_HOSTILE_CREEPS);

		if (enemyCreeps.length > 0) {
			cStructureTower.defend(tower);
		}
		else {
			cStructureTower.support(tower);
			if (spawn.memory.towersRepair && (tower.store[RESOURCE_ENERGY] >= tower.store.getCapacity(RESOURCE_ENERGY) / 2)) {
				cStructureTower.rebuild(tower, spawn.memory.towersRepairWalls);
			}
		}
	}
}
