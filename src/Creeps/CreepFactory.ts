import { SPAWN_CONSTANTS, ROLE_REPAIRER, CREEP_MEMORY } from "Config/Constants";
import * as S from "Structures/StructureExports";
import { TEMPLATE_CREEPS, TEMPLATE_CREEP_WALL_REPAIRER, TEMPLATE_CREEP_RESERVER, TEMPLATE_CREEP_CLAIMER, TEMPLATE_CREEP_HARVESTER } from "Config/Templates/Templates";

export class CreepFactory {

	static spawnCreeps() {
		for (let spawnName in Game.spawns) {
			if (!Game.spawns[spawnName].spawning) {
				let energy: number = Game.spawns[spawnName].room.energyCapacityAvailable;
				let roomName: string = Game.spawns[spawnName].room.name;
				let creepsInRoom: any[] = Game.spawns[spawnName].room.find(FIND_MY_CREEPS);

				if (Game.spawns[spawnName].memory.minHarvesters !== undefined
					&& Game.spawns[spawnName].memory.minUpgraders !== undefined
					&& Game.spawns[spawnName].memory.minCarriers !== undefined
					&& Game.spawns[spawnName].memory.minRepairers !== undefined
					&& Game.spawns[spawnName].memory.minWallRepairers !== undefined
					&& Game.spawns[spawnName].memory.minBuilders !== undefined
					&& Game.spawns[spawnName].memory.minArchitects !== undefined) {

					if (creepsInRoom.length == 0) {
						if(this.spawnTemplate(Game.spawns[spawnName].room.energyAvailable, roomName, spawnName, TEMPLATE_CREEP_HARVESTER) == OK) {
							console.log("SPAWNING EMERGENCY HARVESTER!");
						}
					}

					for (let template of TEMPLATE_CREEPS) {
						let count: number = _.filter(creepsInRoom, (c) => c.memory.role == template.role).length;

						if (count < new S.GetMin(spawnName, template.role).getMin()) {
							this.spawnTemplate(energy, roomName, spawnName, template);
						}
					}
					if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLE_REPAIRER) && (c.memory.mode == CREEP_MEMORY.MODE_REPAIR_WALLS)).length) < Game.spawns[spawnName].memory.minWallRepairers!) {
						this.spawnTemplate(energy, roomName, spawnName, TEMPLATE_CREEP_WALL_REPAIRER);
					}

					if (Game.spawns[spawnName].memory.reserveRoom) {
						if (this.spawnTemplate(energy, roomName, spawnName, TEMPLATE_CREEP_RESERVER, undefined, Game.spawns[spawnName].memory.reserveRoom) == OK) {
							delete Game.spawns[spawnName].memory.reserveRoom;
						}
					}
					else if (Game.spawns[spawnName].memory.claimRoom) {
						if (this.spawnTemplate(energy, roomName, spawnName, TEMPLATE_CREEP_CLAIMER, undefined, Game.spawns[spawnName].memory.claimRoom) == OK) {
							delete Game.spawns[spawnName].memory.claimRoom;
						}
					}
				}
				else {
					console.log(`MISSING PROPERTY IN SPAWN ${spawnName} IN ROOM ${roomName}`);
				}
			}
		}
	}

	private static spawnTemplate(energy: number, roomName: string, spawnName: string, template: TemplateCreep, sourceID?: string, target?: string) {
		let creepBody: BodyPartConstant[] = [];
		let creepName: string = `${template.role} | ${template.name} - (${roomName} | ${spawnName} | ${Game.time % 1650}) - ${Memory.randomData.player}`;
		let partsNumber: number = Math.floor(energy / 200);

		let memory: CreepMemory = {
			role: template.role,
			isWorking: false,
			mode: template.mode,
			sourceID: sourceID,
			target: target
		}

		if (template.bodyType == SPAWN_CONSTANTS.MODE_MULTI) {
			for (let bodyPart in template.body) {
				for (let i = 0; i < partsNumber; i++) {
					creepBody.push(template.body[bodyPart]);
				}
			}
		}
		else if (template.bodyType == SPAWN_CONSTANTS.MODE_SINGLE) {
			creepBody = template.body;
		}

		return Game.spawns[spawnName].spawnCreep(creepBody, creepName, { memory });
	}
}
