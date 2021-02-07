import { Manager } from "Managers/Manager";
import { ManagerCreeps } from "./CreepManager";
import { ManagerMemory } from "./MemoryManager";
import { ManagerRooms } from "./RoomManager";
import { ManagerStructures } from "./StructureManager";

export const MANAGERS: Array<Manager> = [
	new ManagerCreeps,
	new ManagerMemory,
	new ManagerRooms,
	new ManagerStructures,
];
