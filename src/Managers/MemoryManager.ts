export class ManagerMemory extends Manager {
	manage() {
		this.checkMemory();
		this.cleanAll();
	}

	private checkMemory() {
		if (!Memory.randomData) {
			console.log("Missing randomData memory. Creating...");
			console.log("Please change the player property in Memory.randomData to your username!");
			Memory.randomData = {
				player: " ",
			};
		}
	}

	private cleanAll() {
		this.cleanCreeps();
	}

	private cleanCreeps() {
		for (let name in Memory.creeps) {
			if (!(name in Game.creeps)) {
				delete Memory.creeps[name];
			}
		}
	}
}
