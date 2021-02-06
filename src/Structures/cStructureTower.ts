export class cStructureTower {
	public tower: StructureTower;
	constructor(tower: StructureTower) {
		this.tower = tower;
	}

	attack() {
		let target: Creep | null = this.tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target != null) {
			this.tower.attack(target);
		}
	}

	repair(doWalls?: boolean) {
		let structure: Structure | null = this.tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL });
		if (structure == null && doWalls) {
			structure = this.tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL });
		}
		if (structure != null) {
			this.tower.repair(structure);
		}
	}

	heal() {
		let target: Creep | null = this.tower.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
		if (target != null) {
			this.tower.heal(target);
		}
	}
}
