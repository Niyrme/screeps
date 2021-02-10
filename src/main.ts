import { ErrorMapper } from "utils/ErrorMapper";
import { MANAGERS } from "Managers/Exports";

export const loop = ErrorMapper.wrapLoop(() => {
	MANAGERS.forEach(m => {
		m.manage();
	});
});
