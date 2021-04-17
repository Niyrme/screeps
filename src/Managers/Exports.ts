import { Manager } from "Managers/Manager";

import { ManagerCreeps } from "Managers/CreepManager";
import { ManagerMemory } from "Managers/MemoryManager";
import { ManagerRooms } from "Managers/RoomManager";
import { ManagerStructures } from "Managers/StructureManager";

export const MANAGERS: Array<Manager> = [
	new ManagerMemory,
	new ManagerCreeps,
	new ManagerStructures,
	new ManagerRooms,
];
