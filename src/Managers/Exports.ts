import { ManagerCreeps } from "./CreepManager";
import { ManagerMemory } from "./MemoryManager";
import { ManagerStructures } from "./StructureManager";

export const MANAGERS = [
	new ManagerCreeps,
	new ManagerMemory,
	new ManagerStructures,
];
