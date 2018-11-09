import { Device } from "../../Core/Entities/Device";
import { SetActiveDevice, AvailablePeripheralObtained, CleanScannedPeripherals, PeripheralScanStopped, ScanForAvailablePeripherals } from "../Actions/deviceActions";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";

export interface DeviceState {
	devices: Device[];
	scannedPeripherals: BleManagerDiscoverPeripheralResponse[];
	scanning: boolean;
	activeDevice?: Device;
}

export const devicesInitialState: DeviceState = {
	devices: [{
		name: 'Mišák',
		uid: '017ab2',
		connected: true,
		breathingModes: [],
	}, {
		name: 'KačKač',
		uid: '017ab3',
		connected: false,
		breathingModes: [],
	}],
	scanning: false,
	scannedPeripherals: [],
}

type Action = SetActiveDevice & AvailablePeripheralObtained & CleanScannedPeripherals & PeripheralScanStopped & ScanForAvailablePeripherals;

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
					action.peripheral,
				],
			};
		case CleanScannedPeripherals:
			return {
				...state,
				scanning: false,
				scannedPeripherals: [],
			};
		case PeripheralScanStopped:
			return {
				...state,
				scanning: false,
			};
		case ScanForAvailablePeripherals:
			return {
				...state,
				scannedPeripherals: [],
				scanning: true,
			};
		default:
			return state;
	}
}
