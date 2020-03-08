// Roles
export const ROLE_ARCHITECT = "architect";
export const ROLE_BUILDER = "builder";
export const ROLE_CARRIER = "carrier";
export const ROLE_HARVESTER = "harvester";
export const ROLE_MINER = "miner";
export const ROLE_REPAIRER = "repairer";
export const ROLE_SCOUT = "scout";
export const ROLE_ROAMER = "roamer";
export const ROLE_UPGRADER = "upgrader";

// All roles sorted by spawn priority (not that it matters atm)
export enum ROLES_ALL {
  ROLE_MINER = "miner",
  ROLE_HARVESTER = "harvester",
  ROLE_UPGRADER = "upgrader",
  ROLE_CARRIER = "carrier",
  ROLE_REPAIRER = "repairer",
  ROLE_BUILDER = "builder",
  ROLE_ARCHITECT = "architect", // Taking resources from Tombstones, Ruins, Graves, etc. TODO better name
  ROLE_ROAMER = "roamer", // Claimer and Reserver
  ROLE_SCOUT = "scout",
}

// All structures
export enum STRUCTURES_ALL {
  STRUCTURE_CONTAINER = "container",
  STRUCTURE_CONTROLLER = "controller",
  STRUCTURE_EXTENSION = "extension",
  STRUCTURE_EXTRACTOR = "extractor",
  STRUCTURE_FACTORY = "factory",
  STRUCTURE_INVADER_CORE = "invaderCore",
  STRUCTURE_KEEPER_LAIR = "keeperLair",
  STRUCTURE_LAB = "lab",
  STRUCTURE_LINK = "link",
  STRUCTURE_NUKER = "nuker",
  STRUCTURE_OBSERVER = "observer",
  STRUCTURE_PORTAL = "portal",
  STRUCTURE_POWER_BANK = "powerBank",
  STRUCTURE_POWER_SPAWN = "powerSpawn",
  STRUCTURE_RAMPART = "rampart",
  STRUCTURE_ROAD = "road",
  STRUCTURE_SPAWN = "spawn",
  STRUCTURE_STORAGE = "storage",
  STRUCTURE_TERMINAL = "terminal",
  STRUCTURE_TOWER = "tower",
  STRUCTURE_WALL = "constructedWall",
}
