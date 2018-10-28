import { Device } from "../../Core/Entities/Device";
import { SetActiveDevice } from "../Actions/deviceActions";

export interface DeviceState {
	devices: Device[];
	activeDevice?: Device;
}

export const devicesInitialState: DeviceState = {
	devices: [],
}

type Action = SetActiveDevice;

export const devicesReducer = (state: DeviceState = devicesInitialState, action: Action) => {
	switch (action.type) {
		case SetActiveDevice:
			return {
				...state,
				activeDevice: action.device
			};
		default:
			return state;
	}
}
