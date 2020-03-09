import { ROLES_ALL } from "../Config/Constants";

import { CreepFactory } from "Creeps/CreepFactory";

import { RoleArchitect }  from "Creeps/Roles/RoleArchitect";
import { RoleBuilder }    from "Creeps/Roles/RoleBuilder";
import { RoleCarrier }    from "Creeps/Roles/RoleCarrier";
import { RoleHarvester }  from "Creeps/Roles/RoleHarvester";
import { RoleMiner }      from "Creeps/Roles/RoleMiner";
import { RoleRepairer }   from "Creeps/Roles/RoleRepairer";
import { RoleRoamer }     from "Creeps/Roles/RoleRoamer";
import { RoleScout }      from "Creeps/Roles/RoleScout";
import { RoleUpgrader }   from "Creeps/Roles/RoleUpgrader";

export class CreepManager {

  static manageCreeps() {
    CreepFactory.spawnCreeps();
    this.runCreeps();
  }

  private static runCreeps() {
    for (let creep in Game.creeps) {
      let creepName = Game.creeps[creep].name;
      let creepRole = Game.creeps[creep].memory.role;
      let runCreepRole: any = undefined;

      if (creepRole == ROLES_ALL.ROLE_MINER) { runCreepRole = new RoleMiner(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_HARVESTER) { runCreepRole = new RoleHarvester(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_UPGRADER) { runCreepRole = new RoleUpgrader(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_CARRIER) { runCreepRole = new RoleCarrier(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_REPAIRER) { runCreepRole = new RoleRepairer(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_BUILDER) { runCreepRole = new RoleBuilder(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_ARCHITECT) { runCreepRole = new RoleArchitect(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_ROAMER) { runCreepRole = new RoleRoamer(creepName); }
      else if (creepRole == ROLES_ALL.ROLE_SCOUT) { runCreepRole = new RoleScout(creepName); }

      if (runCreepRole) {
        runCreepRole.runCreep();
      }
    }
  }
}
