export class cStructureTower {

	static rebuild(tower: StructureTower, targets: Structure[]): void {
		if (targets && targets.length > 0) {
			let target: Structure | null = tower.pos.findClosestByRange(targets);
			if (target && tower.store[RESOURCE_ENERGY] >= tower.store.getCapacity(RESOURCE_ENERGY)) {
				tower.repair(target);
			}
		}
	}

	static defend(tower: StructureTower, targets: Creep[] | void): void {
		if (targets && targets.length > 0) {
			let target: Creep | null = tower.pos.findClosestByRange(targets);
			if (target) {
				tower.attack(target);
			}
		}
	}

	static support(tower: StructureTower, targets: Creep[] | void): void {
		if (targets && targets.length > 0) {
			let target: Creep | null = tower.pos.findClosestByRange(targets);
			if (target) {
				tower.heal(target);
			}
		}
	}
}
