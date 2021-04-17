import { ErrorMapper } from "utils/ErrorMapper";
import { MANAGERS } from "Managers/Exports";

export const loop = ErrorMapper.wrapLoop(() => {
	for (let manager of MANAGERS) {
		manager.manage();
	}
});
