import { getMin } from "Structures/cStructureSpawn"
import { TEMPLATE_CREEPS } from "Config/Templates/CreepTemplates";

export class MemoryManager {
	static manageMemory() {
		this.checkMemory();
		this.cleanAll();

		if (Memory.randomData.sendDailyReports) {
			let date = new Date();
			let reportDate: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

			let report: string = `Your daily report for your Screeps colony!
(from ${reportDate})
Your current Global Control Level is ${Game.gcl.level}
Your current Global Power Level is ${Game.gpl.level}
`;

			if (reportDate != Memory.randomData.lastReport) {
				for (let spawnName in Game.spawns) {
					report += `\n`;

					for (let spawn in Game.spawns) {
						if (Game.spawns[spawn].room.controller != undefined) {
							report += `\nRoom ${Game.spawns[spawn].room.name} is at level ${Game.spawns[spawn].room.controller!.level}`;
						}
					}

					report += `\n`;

					for (let template of TEMPLATE_CREEPS) {
						let count: number = _.filter(Game.spawns[spawnName].room.find(FIND_MY_CREEPS), (c) => c.memory.role == template.role).length;

						if (count < getMin(Game.spawns[spawnName], template.role)) {
							report += `\nRoom: ${Game.spawns[spawnName].room.name} | Spawn: ${spawnName} | Missing ${getMin(Game.spawns[spawnName], template.role) - count} creep(s) of role ${template.role}`;
						}
					}
				}
				console.log("Sending report...");
				Game.notify(report);
				Memory.randomData.lastReport = reportDate;
			}
		}
	}

	private static checkMemory() {
		if (!Memory.randomData) {
			console.log("Missing randomData memory. Creating...");
			console.log("Please change the player property in Memory.randomData to your username!");
			Memory.randomData = {
				player: " ",
				sendDailyReports: false,
				lastReport: " "
			};
		}
	}

	private static cleanAll() {
		this.cleanCreeps();
	}

	private static cleanCreeps() {
		for (let name in Memory.creeps) {
			if (!(name in Game.creeps)) {
				delete Memory.creeps[name];
			}
		}
	}
}
