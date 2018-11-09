import { Device } from "../../Core/Entities/Device";
import { SetActiveDevice, AvailablePeripheralObtained, CleanScannedPeripherals, PeripheralScanStopped, ScanForAvailablePeripherals, PeripheralBondStart, PeripheralBondSucceeded, PeripheralBondFailed } from "../Actions/deviceActions";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";
import { ScanForPeripheralResponse } from "../../Core/Bluetooth/createBleAdapter";

export interface DeviceBondState {
	peripheral: BleManagerDiscoverPeripheralResponse;
	bonding: boolean;
	succeeded: boolean;
}

export interface DeviceState {
	devices: Device[];
	scannedPeripherals: ScanForPeripheralResponse[];
	scanning: boolean;
	activeDevice?: Device;
	bond?: DeviceBondState;
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

type Action =
	SetActiveDevice &
	AvailablePeripheralObtained &
	CleanScannedPeripherals &
	PeripheralScanStopped &
	ScanForAvailablePeripherals &
	PeripheralBondStart &
	PeripheralBondFailed &
	PeripheralBondSucceeded
	;

export const devicesReducer = (state: DeviceState = devicesInitialState, action: Action): DeviceState => {
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
		case PeripheralBondStart:
			return {
				...state,
				bond: {
					bonding: true,
					peripheral: action.peripheral,
					succeeded: false,
				},
			}
		case PeripheralBondSucceeded:
			return {
				...state,
				bond: {
					bonding: true,
					peripheral: action.peripheral,
					succeeded: true,
				},
			}
		case PeripheralBondFailed:
			return {
				...state,
				bond: {
					bonding: true,
					peripheral: action.peripheral,
					succeeded: false,
				},
			}
		default:
			return state;
	}
}
