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
		// User owns this room
		let energy: number = this.room.energyCapacityAvailable;
		let creepsInRoom: Array<Creep> = this.room.find(FIND_MY_CREEPS);
		this.room.memory.mins.forEach(m => {
			if(m.count !== undefined) {
				console.log(`Property ${m.name} missing in memory of room ${this.room.name}!`);
			}
		});

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
					if (count < m.count!) {
						this.spawnTemplate(energy, template);
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

	private spawnTemplate(energy: number, template: TemplateCreep, sourceID?: string, target?: string) {
		let creepBody: Array<BodyPartConstant> = [];
		let spawn: StructureSpawn = _.filter(this.room.find(FIND_MY_SPAWNS), (s) => (s.spawning == null))[0];
		let creepName: string = `${template.role} - (${this.room.name} | ${spawn.name} | ${Game.time % 1650}) - ${Memory.randomData.player}`;
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
