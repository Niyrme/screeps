import { SPAWN_CONSTANTS } from "Config/Constants";
import * as S from "Structures/StructureExports";
import { TEMPLATE_CREEPS } from "Config/Templates/Templates";

export class CreepFactory {

	static spawnCreeps() {
		for (let spawnName in Game.spawns) {
			if (!Game.spawns[spawnName].spawning) {
				let energy: number = Game.spawns[spawnName].room.energyCapacityAvailable;
				let creepsInRoom: any[] = Game.spawns[spawnName].room.find(FIND_MY_CREEPS);
				let roomName: string = Game.spawns[spawnName].room.name;

				if (Game.spawns[spawnName].memory.minHarvesters !== undefined
					&& Game.spawns[spawnName].memory.minUpgraders !== undefined
					&& Game.spawns[spawnName].memory.minCarriers !== undefined
					&& Game.spawns[spawnName].memory.minRepairers !== undefined
					&& Game.spawns[spawnName].memory.minWallRepairers !== undefined
					&& Game.spawns[spawnName].memory.minBuilders !== undefined
					&& Game.spawns[spawnName].memory.minArchitects !== undefined) {

					for (let template of TEMPLATE_CREEPS) {
						let count: number = _.filter(creepsInRoom, (c) => c.memory.role == template.role).length;

						if (count < new S.GetMin(spawnName, template.role).getMin()) {
							this.spawnTemplate(energy, roomName, spawnName, template);
						}
					}
				}
				else {
					console.log(`MISSING PROPERTY IN SPAWN ${spawnName} IN ROOM ${roomName}`);
				}
			}
		}
	}

	private static spawnTemplate(energy: number, roomName: string, spawnName: string, template: TemplateCreep, sourceID?: string) {
		let creepBody: BodyPartConstant[] = [];
		let creepName: string = `${template.role} - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;
		let partsNumber: number = Math.floor(energy / 200);

		let defaultMemory: CreepMemory = {
			role: template.role,
			isWorking: false
		}
		let optionalMemory = {}

		if (template.mode != undefined) {
			optionalMemory = { ...optionalMemory, mode: template.mode }
		}
		if (sourceID != undefined) {
			optionalMemory = { ...optionalMemory, sourceID: sourceID }
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

		return Game.spawns[spawnName].spawnCreep(creepBody, creepName, { memory: { ...defaultMemory, ...optionalMemory } });
	}
}
