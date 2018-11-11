import { Device } from "../../Core/Entities/Device";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";
import { DiscoveredBondedDevices, PeripheralBondStart, PeripheralBondFailed, PeripheralBondSucceeded } from "../Actions/Device/devicesBondActions";
import { SetActiveDevice, DeviceSetName } from "../Actions/Device/deviceActions";
import { AvailablePeripheralObtained, CleanScannedPeripherals, PeripheralScanStopped, ScanForAvailablePeripherals } from "../Actions/Device/deviceScanActions";

export interface DeviceBondState {
	peripheral: BleManagerDiscoverPeripheralResponse;
	bonding: boolean;
	succeeded: boolean;
}

export interface DeviceDiscoverState {
	initialDiscoverDone: boolean;
}

export interface DeviceState {
	devices: Device[];
	scannedPeripherals: BleManagerDiscoverPeripheralResponse[];
	scanning: boolean;
	activeDevice?: Device;
	bond?: DeviceBondState;
	discover: DeviceDiscoverState;
}

export const devicesInitialState: DeviceState = {
	devices: [],
	scanning: false,
	scannedPeripherals: [],
	discover: {
		initialDiscoverDone: false
	},
}

type Action =
	SetActiveDevice &
	AvailablePeripheralObtained &
	CleanScannedPeripherals &
	PeripheralScanStopped &
	ScanForAvailablePeripherals &
	PeripheralBondStart &
	PeripheralBondFailed &
	PeripheralBondSucceeded &
	DiscoveredBondedDevices &
	DeviceSetName
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
			const devicesIfAlreadyExisted = state.devices.filter((device: Device) => device.uid !== action.bondedPeripheral.id); 
			return {
				...state,
				devices: [
					...devicesIfAlreadyExisted,
					{
						breathingModes: [],
						connected: true,
						name: 'Fred',
						uid: action.bondedPeripheral.id,
					}
				],
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
		case DiscoveredBondedDevices:
			return {
				...state,
				devices: action.devices,
				discover: {
					...state.discover,
					initialDiscoverDone: true,
				}
			}
		case DeviceSetName:
			const changedName = state.devices.map((device: Device) => {
				if (device.uid === action.uid) {
					return {
						...device,
						name: action.name
					};
				} else {
					return device;
				}
			});
			return {
				...state,
				devices: changedName,
			}
		default:
			console.log(action);
			return state;
	}
}
