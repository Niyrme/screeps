import * as _ from "lodash";

import { ROLES_ALL } from "../Config/Constants";

export class CreepFactory {

  static spawnCreeps() {
    for (let spawnName in Game.spawns) {
      if (!Game.spawns[spawnName].spawning) {
        let energy: number = Game.spawns[spawnName].room.energyCapacityAvailable;
        let creepsInRoom: any[] = Game.spawns[spawnName].room.find(FIND_MY_CREEPS);
        let roomName: string = Game.spawns[spawnName].room.name;

        // TODO let's find a better way
        let numArchitects:  number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_ARCHITECT).length;
        let numBuilders:    number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_BUILDER).length;
        let numCarriers:    number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_CARRIER).length;
        let numHarvesters:  number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_HARVESTER).length;
        let numMiners:      number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_MINER).length;
        let numRepaierers:  number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_REPAIRER).length;
        let numUpgraders:   number = _.filter(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_UPGRADER).length;

        if (Game.spawns[spawnName].memory.minMiners) {
          if (Game.spawns[spawnName].memory.minMiners! > 0) {
            if (numHarvesters == 0 && numCarriers == 0) {
              if (Game.spawns[spawnName].room.storage) {
                if (numMiners > 0 || (Game.spawns[spawnName].room.storage! && Game.spawns[spawnName].room.storage!.store[RESOURCE_ENERGY] >= 150 + 550)) {
                  this.spawnCarrier(Game.spawns[spawnName].room.energyAvailable, roomName, spawnName);
                }
                else { this.spawnCustom(Game.spawns[spawnName].room.energyAvailable, ROLES_ALL.ROLE_HARVESTER, roomName, spawnName); }
              }
            }
            else {
              if (numMiners < Game.spawns[spawnName].memory.minMiners!) {
                let sources = Game.spawns[spawnName].room.find(FIND_SOURCES) as Source[] | undefined | null;
                if (sources) {
                  for (let source of sources) {
                    if (!_.some(creepsInRoom, (c) => c.memory.role == ROLES_ALL.ROLE_MINER && c.memory.sourceID == source.id)) {
                      let containers = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER }) as StructureContainer[] | undefined | null;
                      if (containers) {
                        if (containers.length > 0) {
                          let sourceID: string | undefined;
                          if (Game.spawns[spawnName].memory.minerSource) {
                            sourceID = Game.spawns[spawnName].memory.minerSource;
                          }
                          else { sourceID = source.id; }

                          this.spawnMiner(sourceID as string, roomName, spawnName);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (Game.spawns[spawnName].memory.minHarvesters) {
          if (numHarvesters  < Game.spawns[spawnName].memory.minHarvesters!) {
          this.spawnCustom(energy, ROLES_ALL.ROLE_HARVESTER, roomName, spawnName);
        }
        }
        if (Game.spawns[spawnName].memory.minUpgraders) {
          if (numUpgraders   < Game.spawns[spawnName].memory.minUpgraders!) {
          this.spawnCustom(energy, ROLES_ALL.ROLE_HARVESTER, roomName, spawnName);
        }
        }
        if (Game.spawns[spawnName].memory.minCarriers) {
          if (numCarriers    < Game.spawns[spawnName].memory.minCarriers!) {
          this.spawnCarrier(energy / 2, roomName, spawnName);
        }
        }
        if (Game.spawns[spawnName].memory.minRepairers) {
          if (numRepaierers  < Game.spawns[spawnName].memory.minRepairers!) {
          this.spawnCustom(energy, ROLES_ALL.ROLE_REPAIRER, roomName, spawnName);
        }
        }
        if (Game.spawns[spawnName].memory.minBuilders) {
          if (numBuilders    < Game.spawns[spawnName].memory.minBuilders!) {
          this.spawnCustom(energy, ROLES_ALL.ROLE_BUILDER, roomName, spawnName);
        }
        }
        if (Game.spawns[spawnName].memory.minArchitects) {
          if (numArchitects  < Game.spawns[spawnName].memory.minArchitects!) {
          this.spawnArchitect(energy / 2, roomName, spawnName);
        }
        }
      }
    }
  }

  private static spawnCustom(energy: number, roleName: string, roomName: string, spawnName: string) {
    let body: BodyPartConstant[] = [];
    let creepName: string = `${roleName} - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;
    let partsNumber: number = Math.floor(energy / 200);
    if (partsNumber < 3) { return null; }

    if (partsNumber > 16) { partsNumber = 16; }

    for (let i = 0; i < partsNumber; i++) { body.push(WORK); } // Cost: 100
    for (let i = 0; i < partsNumber; i++) { body.push(CARRY); } // Cost: 50
    for (let i = 0; i < partsNumber; i++) { body.push(MOVE); } // Cost: 50

    Game.spawns[spawnName].spawnCreep(body, creepName, {
      memory: {
        role: roleName,
        isWorking: false
      }
    });

    return OK;
  }

  private static spawnArchitect(energy: number, roomName: string, spawnName: string) {
    let body: BodyPartConstant[] = [];
    let creepName: string = `Architect - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;
    let partsNumber: number = Math.floor(energy / 150);
    if (partsNumber < 3) { return null; }

    if (partsNumber > 16) { partsNumber = 16; }

    for (let i = 0; i < partsNumber * 2; i++) { body.push(CARRY); } // Cost: 50
		for (let i = 0; i < partsNumber; i++) { body.push(MOVE); } // Cost: 50

    Game.spawns[spawnName].spawnCreep(body, creepName, {
      memory: {
        role: ROLES_ALL.ROLE_ARCHITECT,
        isWorking: false
      }
    });

    return OK;
  }
  private static spawnCarrier(energy: number, roomName: string, spawnName: string) {
    let body: BodyPartConstant[] = [];
    let partsNumber: number = Math.floor(energy/ 150);
    let creepName: string = `Carrier - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;

    if (partsNumber < 3) { return null; }

    if (partsNumber > 16) { partsNumber = 16; }

    for (let i = 0; i < partsNumber * 2; i++) { body.push(CARRY); } // Cost: 50
    for (let i = 0; i < partsNumber; i++) { body.push(MOVE); } // Cost: 50

    Game.spawns[spawnName].spawnCreep(body, creepName, {
      memory: {
        role: ROLES_ALL.ROLE_CARRIER,
        isWorking: false
      }
    });

    return OK;
  }
  private static spawnMiner(sourceID: string, roomName: string, spawnName: string) {
    let creepName: string = `miner => ${sourceID} - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;
    let body: BodyPartConstant[] = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];

    Game.spawns[spawnName].spawnCreep(body, creepName, {
      memory: {
        role: ROLES_ALL.ROLE_MINER,
        sourceID: sourceID
      }
    });

    return OK;
  }
  private static spawnRoamer(target: string, roomName: string, spawnName: string, mode: string) {
    let creepName = `Roamer => ${target} - (${roomName} | ${spawnName} | ${Game.time % 1650}) - Niyrme`;

    Game.spawns[spawnName].spawnCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], creepName, {
      memory: {
        role: "roamer",
        target: target
      }
    }); // Cost: 1500

    return OK;
  }
}
