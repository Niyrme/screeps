import { MemoryManager } from "Managers/MemoryManager";
import { CreepManager } from "Managers/CreepManager";
import { StructureManager } from "Managers/StructureManager";

export class Manager {
  static manageAll() {
    MemoryManager.manageMemory();
    CreepManager.manageCreeps();
    StructureManager.manageStructures();
  }
}
