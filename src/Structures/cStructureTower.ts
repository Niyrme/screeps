import { cStructure } from "Structures/cStructure";

export class cStructureTower extends cStructure {
	public tower: StructureTower;
	private room: Room;
	constructor(tower: StructureTower, room: Room) {
		super();
		this.room = room;
		this.tower = tower;
	}

	public manage() {
		let enemyCreeps: Creep[] | undefined = this.tower.room.find(FIND_HOSTILE_CREEPS);

		if (enemyCreeps.length > 0) {
			this.attack();
		}
		else {
			this.heal();
			if ( this.room.memory.towersRepair && (this.tower.store[RESOURCE_ENERGY] >= this.tower.store.getCapacity(RESOURCE_ENERGY) / 2) ) {
				this.repair(this.room.memory.towersRepairWalls);
			}
		}
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
