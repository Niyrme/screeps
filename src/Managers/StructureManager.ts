import { cStructureTower } from "Structures/cStructureTower";

import * as lodash from "lodash";

export class StructureManager {
	static manageStructures() {
		for (let spawnName in Game.spawns) {
			for (let structure in Game.structures) {
				if (Game.structures[structure].structureType == STRUCTURE_TOWER) { this.manageTowers(Game.structures[structure] as StructureTower, Game.spawns[spawnName]); }
			}
		}
	}

	private static manageTowers(tower: StructureTower, spawn: StructureSpawn): void {
		let enemyCreeps: Creep[] | null | undefined | void = tower.room.find(FIND_HOSTILE_CREEPS);

		if (enemyCreeps) {
			cStructureTower.defend(tower, enemyCreeps);
		}
		else {
			cStructureTower.support(tower, (lodash.filter(Game.creeps, (c) => c.hits < c.hitsMax)));
			if (spawn.memory.towersRepair && (tower.store[RESOURCE_ENERGY] >= tower.store.getCapacity(RESOURCE_ENERGY) / 2)) {
				cStructureTower.rebuild(tower, (lodash.filter(Game.structures, (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL)));
			}
		}
	}
}
