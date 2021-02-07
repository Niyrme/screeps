export abstract class Role {
	protected creep: Creep;
	constructor(creepName: string) {
		this.creep = Game.creeps[creepName];
	}
	abstract runCreep(): void;
}
