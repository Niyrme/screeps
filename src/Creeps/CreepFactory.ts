import {
	ROLES_ALL as Roles,
	SPAWN_CONSTANTS
} from "Config/Constants";
import * as Template from "Config/Templates/CreepTemplates";

export class CreepFactory {

	private room: Room;
	constructor(room: Room) {
		this.room = room;
	}

	public spawnCreeps() {
		let energy: number = this.room.energyCapacityAvailable;
		let creepsInRoom: Array<Creep> = this.room.find(FIND_MY_CREEPS);

		let countHarvesters = _.filter(creepsInRoom, (c) => (c.memory.role == Roles.ROLE_HARVESTER) && ((c.memory.mode == undefined) || (c.memory.target == undefined))).length;
		let countMiners = _.filter(creepsInRoom, (c) => (c.memory.role == Roles.ROLE_MINER)).length;

		if ((creepsInRoom.length == 0) || (countHarvesters == 0 && countMiners == 0)) {
			if (this.spawnTemplate(this.room.energyAvailable, Template.TEMPLATE_CREEP_HARVESTER) == OK) {
				console.log("SPAWNING EMERGENCY HARVESTER!");
			}
		}

		Template.TEMPLATE_CREEPS.forEach(template => {
			let count: number = _.filter(creepsInRoom, (c) => (c.memory.role == template.role) && (c.memory.mode == undefined)).length;

			this.room.memory.mins.forEach(m => {
				if (m.name == template.role) {
					if (count < m.count) {
						if (template.role == Template.TEMPLATE_CREEP_MINER.role) {
							this.room.find(FIND_SOURCES).forEach(source => {
								if (!_.some(creepsInRoom, (c) => (c.memory.role == Template.TEMPLATE_CREEP_MINER.role && c.memory.sourceID == source.id))) {
									if (source.pos.findInRange(FIND_STRUCTURES, 1, { filter: (s) => s.structureType == STRUCTURE_CONTAINER }).length > 0) {
										this.spawnTemplate(energy, template, source.id);
									}
								}
							});
						}
						else {
							this.spawnTemplate(energy, template);
						}
					}
				}
			});
		});

		if (this.room.memory.reserveRoom) {
			if (this.spawnTemplate(energy, Template.TEMPLATE_CREEP_RESERVER, undefined, this.room.memory.reserveRoom) == OK) {
				delete this.room.memory.reserveRoom;
			}
		}
		else if (this.room.memory.claimRoom) {
			if (this.spawnTemplate(energy, Template.TEMPLATE_CREEP_CLAIMER, undefined, this.room.memory.claimRoom) == OK) {
				delete this.room.memory.claimRoom;
			}
		}
	}

	private spawnTemplate(energy: number, template: TemplateCreep, sourceID?: Id<Source>, target?: string) {
		let creepBody: Array<BodyPartConstant> = [];
		let spawn: StructureSpawn = _.filter(this.room.find(FIND_MY_SPAWNS), (s) => (s.spawning == null))[0];
		if (!spawn) { return; }
		let creepName: string = `${template.role} - ${Memory.randomData.player} (${Game.time % 1650})`;
		let creepMaxSize: number = MAX_CREEP_SIZE;

		if (template.bodyType == SPAWN_CONSTANTS.MODE_MULTI) {
			let partsNumber: number = Math.floor(energy / 200);

			if (this.room.memory.creepMaxParts != undefined) {
				creepMaxSize = this.room.memory.creepMaxParts!;
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
