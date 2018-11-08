import { Device } from "../../Core/Entities/Device";
import { SetActiveDevice, AvailablePeripheralObtained, CleanScannedPeripherals, PeripheralScanStopped } from "../Actions/deviceActions";

export interface DeviceState {
	devices: Device[];
	scannedPeripherals: any[];
	scanning: boolean;
	activeDevice?: Device;
}

export const devicesInitialState: DeviceState = {
	devices: [{
		name: 'Mišák',
		uid: '017ab2',
	}],
	scanning: false,
	scannedPeripherals: [],
}

type Action = SetActiveDevice & AvailablePeripheralObtained & CleanScannedPeripherals & PeripheralScanStopped;

export const devicesReducer = (state: DeviceState = devicesInitialState, action: Action) => {
	switch (action.type) {
		case SetActiveDevice:
			return {
				...state,
				activeDevice: action.device
			};
		case AvailablePeripheralObtained:
			return {
				...state,
				scanning: true,
				scannedPeripherals: [
					...state.scannedPeripherals,
					action.peripheral
				]
			};
		case CleanScannedPeripherals:
			return {
				...state,
				scanning: false,
				scannedPeripherals: []
			};
		case PeripheralScanStopped:
			return {
				...state,
				scanning: false,
			}
		default:
			return state;
	}
}
