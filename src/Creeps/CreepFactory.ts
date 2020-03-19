import { ROLES_ALL, SPAWN_CONSTANTS, CREEP_MEMORY } from "Config/Constants";
import * as T from "Config/Templates/Templates";

export class CreepFactory {

	static spawnCreeps() {
		for (let spawnName in Game.spawns) {
			if (!Game.spawns[spawnName].spawning) {
				let energy: number = Game.spawns[spawnName].room.energyCapacityAvailable;
				let roomName: string = Game.spawns[spawnName].room.name;
				let spawnMemory: SpawnMemory = Game.spawns[spawnName].memory;
				let creepsInRoom: any[] = Game.spawns[spawnName].room.find(FIND_MY_CREEPS);

				if (Game.spawns[spawnName].memory.minHarvesters !== undefined
					&& Game.spawns[spawnName].memory.minUpgraders !== undefined
					&& Game.spawns[spawnName].memory.minCarriers !== undefined
					&& Game.spawns[spawnName].memory.minRepairers !== undefined
					&& Game.spawns[spawnName].memory.minWallRepairers !== undefined
					&& Game.spawns[spawnName].memory.minBuilders !== undefined
					&& Game.spawns[spawnName].memory.minArchitects !== undefined) {

					let countHarvesters = _.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_HARVESTER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length;
					let countMiners = _.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_MINER)).length;

					if ((creepsInRoom.length == 0) || (countHarvesters == 0 && countMiners == 0)) {
						if(this.spawnTemplate(Game.spawns[spawnName].room.energyAvailable, roomName, spawnName, T.TEMPLATE_CREEP_HARVESTER) == OK) {
							console.log("SPAWNING EMERGENCY HARVESTER!");
						}
					}

					if (countHarvesters < spawnMemory.minHarvesters!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_HARVESTER);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_UPGRADER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length) < spawnMemory.minUpgraders!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_UPGRADER);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_CARRIER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length) < spawnMemory.minCarriers!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_CARRIER);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_REPAIRER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length) < spawnMemory.minRepairers!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_REPAIRER);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_BUILDER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length) < spawnMemory.minBuilders!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_BUILDER);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_ARCHITECT) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length) < spawnMemory.minArchitects!) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_ARCHITECT);
					}
					else if ((_.filter(creepsInRoom, (c) => (c.memory.role == ROLES_ALL.ROLE_REPAIRER) && (c.memory.mode == CREEP_MEMORY.MODE_REPAIR_WALLS)))) {
						this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_WALL_REPAIRER);
					}
					else if (spawnMemory.reserveRoom) {
						if (this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_RESERVER, undefined, Game.spawns[spawnName].memory.reserveRoom) == OK) {
							delete Game.spawns[spawnName].memory.reserveRoom;
						}
					}
					else if (spawnMemory.claimRoom) {
						if (this.spawnTemplate(energy, roomName, spawnName, T.TEMPLATE_CREEP_CLAIMER, undefined, Game.spawns[spawnName].memory.claimRoom) == OK) {
							delete Game.spawns[spawnName].memory.claimRoom;
						}
					}

					/* NOTE not actually working that good with current setup (haveing modes for normal and wall repairing, claiming adn reserveing, etc.)
					for (let template of T.TEMPLATE_CREEPS) {
						let count: number = _.filter(creepsInRoom, (c) => (c.memory.role == template.role) && (c.memory.mode == undefined)).length;

						if (count < new S.GetMin(spawnName, template.role).getMin()) {
							this.spawnTemplate(energy, roomName, spawnName, template);
						}
					} */
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
