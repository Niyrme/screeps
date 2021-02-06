import {
	ROLES_ALL as Roles,
	SPAWN_CONSTANTS
} from "Config/Constants";
import { getMin } from "Structures/Exports";
import * as Template from "Config/Templates/CreepTemplates";

export class CreepFactory {

	static spawnCreeps() {
		for (let spawnName in Game.spawns) {
			if (!Game.spawns[spawnName].spawning) {
				let energy: number = Game.spawns[spawnName].room.energyCapacityAvailable;
				let spawn: StructureSpawn = Game.spawns[spawnName];
				let spawnMemory: SpawnMemory = Game.spawns[spawnName].memory;
				let creepsInRoom: any[] = Game.spawns[spawnName].room.find(FIND_MY_CREEPS);

				if (spawn.memory.minHarvesters !== undefined
					&& spawn.memory.minUpgraders !== undefined
					&& spawn.memory.minCarriers !== undefined
					&& spawn.memory.minRepairers !== undefined
					&& spawn.memory.minWallRepairers !== undefined
					&& spawn.memory.minBuilders !== undefined
					&& spawn.memory.minArchitects !== undefined) {

					let countHarvesters = _.filter(creepsInRoom, (c) => (c.memory.role == Roles.ROLE_HARVESTER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length;
					let countMiners = _.filter(creepsInRoom, (c) => (c.memory.role == Roles.ROLE_MINER)).length;

					if ((creepsInRoom.length == 0) || (countHarvesters == 0 && countMiners == 0)) {
						if(this.spawnTemplate(spawn.room.energyAvailable, spawn, Template.TEMPLATE_CREEP_HARVESTER) == OK) {
							console.log("SPAWNING EMERGENCY HARVESTER!");
						}
					}

					Template.TEMPLATE_CREEPS.forEach(template => {
						let count: number = _.filter(creepsInRoom, (c) => (c.memory.role == template.role) && (c.memory.mode == undefined)).length;

						if (count < getMin(Game.spawns[spawnName], template.role)) {
							this.spawnTemplate(energy, spawn, template);
						}
					});

					if (spawnMemory.reserveRoom) {
						if (this.spawnTemplate(energy, spawn, Template.TEMPLATE_CREEP_RESERVER, undefined, spawn.memory.reserveRoom) == OK) {
							delete spawn.memory.reserveRoom;
						}
					}
					else if (spawnMemory.claimRoom) {
						if (this.spawnTemplate(energy, spawn, Template.TEMPLATE_CREEP_CLAIMER, undefined, spawn.memory.claimRoom) == OK) {
							delete spawn.memory.claimRoom;
						}
					}
				}
				else {
					console.log(`MISSING PROPERTY IN SPAWN ${spawn.name} IN ROOM ${spawn.room.name}`);
				}
			}
		}
	}

	private static spawnTemplate(energy: number, spawn: StructureSpawn, template: TemplateCreep, sourceID?: string, target?: string) {
		let creepBody: BodyPartConstant[] = [];
		let creepName: string = `${template.name} - (${spawn.room.name} | ${spawn.name} | ${Game.time % 1650}) - ${Memory.randomData.player}`;
		let creepMaxSize: number = MAX_CREEP_SIZE;

		if (template.bodyType == SPAWN_CONSTANTS.MODE_MULTI) {
			let partsNumber: number = Math.floor(energy / 200);

			if (spawn.memory.creepMaxParts != undefined) {
				creepMaxSize = spawn.memory.creepMaxParts!;
			}

			if (partsNumber * template.body.length > creepMaxSize) {
				partsNumber = Math.floor(creepMaxSize / template.body.length);
			}
			template.body.forEach(part => {
				for (let i=0;i<partsNumber;i++) {
					creepBody.push(part);
				}
			});
		}
		else if (template.bodyType == SPAWN_CONSTANTS.MODE_SINGLE) {
			creepBody = template.body;
		}

		return spawn.spawnCreep(creepBody, creepName, {memory: {
			role: template.role,
			isWorking: false,
			mode: template.mode,
			sourceID: sourceID,
			target: target
		}});
	}
}
