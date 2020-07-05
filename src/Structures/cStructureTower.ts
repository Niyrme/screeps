const rebuild = (tower: StructureTower, doWalls?: boolean) => {
	let structure: Structure | null = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL });
	if (structure == null && doWalls) {
		structure = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL });
	}
	if (structure != null) {
		tower.repair(structure);
	}
}

const defend = (tower: StructureTower) => {
	let target: Creep | null = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (target != null) {
		tower.attack(target);
	}
}

const support = (tower: StructureTower) => {
	let target: Creep | null = tower.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
	if (target != null) {
		tower.heal(target);
	}
}

export {
	rebuild,
	defend,
	support
}
