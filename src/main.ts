import { ErrorMapper } from "Utils/ErrorMapper";

import { CreepManager } 		from "Managers/CreepManager";
import { MemoryManager }   	from "Managers/MemoryManager"
import { StructureManager } from "Managers/StructureManager";

export const loop = ErrorMapper.wrapLoop(() => {
	CreepManager.manageCreeps();
	MemoryManager.manageMemory();
	StructureManager.manageStructures();
});
