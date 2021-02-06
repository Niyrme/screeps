import {
	ROLES_ALL as Roles,
	CREEP_MEMORY,
	SPAWN_CONSTANTS
} from "Config/Constants";
import * as R from "Creeps/Roles/Exports";

const TEMPLATE_BODY_DEFAULT = [WORK, CARRY, MOVE]; // Cost: 200x

// Creep templates
const TEMPLATE_CREEP_ARCHITECT: TemplateCreep = {
	name: "Architect",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: [CARRY, MOVE], // Cost: 150x
	role: Roles.ROLE_ARCHITECT,
	creepClass: R.RoleArchitect,
};

const TEMPLATE_CREEP_BUILDER: TemplateCreep = {
	name: "Builder",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_BUILDER,
	creepClass: R.RoleBuilder,
};

const TEMPLATE_CREEP_CARRIER: TemplateCreep = {
	name: "Carrier",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_CARRIER,
	creepClass: R.RoleCarrier,
};

const TEMPLATE_CREEP_HARVESTER: TemplateCreep = {
	name: "Harvester",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_HARVESTER,
	creepClass: R.RoleHarvester,
};

const TEMPLATE_CREEP_MINER: TemplateCreep = {
	name: "Miner",
	bodyType: SPAWN_CONSTANTS.MODE_SINGLE,
	body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], // Cost: 600
	role: Roles.ROLE_MINER,
	creepClass: R.RoleMiner,
};

const TEMPLATE_CREEP_REPAIRER: TemplateCreep = {
	name: "Repairer",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_REPAIRER,
	creepClass: R.RoleRepairer,
};
const TEMPLATE_CREEP_WALL_REPAIRER: TemplateCreep = {
	name: "WallRepairer",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_WALL_REPAIRER,
	creepClass: R.RoleWallRepairer,
};

const TEMPLATE_CREEP_CLAIMER: TemplateCreep = {
	name: "Claimer",
	bodyType: SPAWN_CONSTANTS.MODE_SINGLE,
	body: [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], // Cost: 1000
	role: Roles.ROLE_ROAMER,
	mode: CREEP_MEMORY.MODE_CLAIM,
	creepClass: R.RoleRoamer,
};
const TEMPLATE_CREEP_RESERVER: TemplateCreep = {
	name: "Reserver",
	bodyType: SPAWN_CONSTANTS.MODE_SINGLE,
	body: [CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], // Cost: 1500
	role: Roles.ROLE_ROAMER,
	mode: CREEP_MEMORY.MODE_RESERVE,
	creepClass: R.RoleRoamer,
};

const TEMPLATE_CREEP_SCOUT: TemplateCreep = {
	name: "Scout",
	bodyType: SPAWN_CONSTANTS.MODE_SINGLE,
	body: [MOVE, MOVE, MOVE, MOVE, MOVE], // Cost: 250
	role: Roles.ROLE_SCOUT,
	creepClass: R.RoleScout,
};

const TEMPLATE_CREEP_UPGRADER: TemplateCreep = {
	name: "Upgrader",
	bodyType: SPAWN_CONSTANTS.MODE_MULTI,
	body: TEMPLATE_BODY_DEFAULT,
	role: Roles.ROLE_UPGRADER,
	creepClass: R.RoleUpgrader,
};


const TEMPLATE_CREEPS: TemplateCreep[] = [
	TEMPLATE_CREEP_ARCHITECT,
	TEMPLATE_CREEP_BUILDER,
	TEMPLATE_CREEP_CARRIER,
	TEMPLATE_CREEP_HARVESTER,
	TEMPLATE_CREEP_MINER,
	TEMPLATE_CREEP_REPAIRER,
	TEMPLATE_CREEP_WALL_REPAIRER,
	TEMPLATE_CREEP_CLAIMER,
	TEMPLATE_CREEP_RESERVER,
	TEMPLATE_CREEP_SCOUT,
	TEMPLATE_CREEP_UPGRADER
];

export { TEMPLATE_BODY_DEFAULT }
export {
	TEMPLATE_CREEP_ARCHITECT,
	TEMPLATE_CREEP_BUILDER,
	TEMPLATE_CREEP_CARRIER,
	TEMPLATE_CREEP_HARVESTER,
	TEMPLATE_CREEP_MINER,
	TEMPLATE_CREEP_REPAIRER,
	TEMPLATE_CREEP_WALL_REPAIRER,
	TEMPLATE_CREEP_CLAIMER,
	TEMPLATE_CREEP_RESERVER,
	TEMPLATE_CREEP_SCOUT,
	TEMPLATE_CREEP_UPGRADER
}
export { TEMPLATE_CREEPS }
