import { ErrorMapper }    from "Utils/ErrorMapper";
import { Manager }   from "Managers/Manager"

export const loop = ErrorMapper.wrapLoop(() => {
  Manager.manageAll();
});
