import { CreepManager }   from "Creeps/CreepManager";
import { CreepFactory }   from "Creeps/CreepFactory";
import { ErrorMapper }    from "Utils/ErrorMapper";
import { MemoryManager }  from "Memory/Memory";

export const loop = ErrorMapper.wrapLoop(() => {
  MemoryManager.clean();
  CreepManager.runCreeps();
  CreepFactory.spawnCreeps();
});
