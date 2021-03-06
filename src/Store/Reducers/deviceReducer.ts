import { Device } from "../../Core/Entities/Device";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";
import { DiscoveredBondedDevices, PeripheralBondStart, PeripheralBondFailed, PeripheralBondSucceeded, DeviceConnected, DeviceDisconnected } from "../Actions/Device/devicesBondActions";
import { SetActiveDevice, DeviceSetName, DeviceConnectionRemove, DeviceConnectionRemoved } from "../Actions/Device/deviceActions";
import { AvailablePeripheralObtained, CleanScannedPeripherals, PeripheralScanStopped, ScanForAvailablePeripherals } from "../Actions/Device/deviceScanActions";
import { DeviceBreathingModesLoaded, DeviceBatteryLoaded } from "../Actions/Device/deviceBreathingModesActions";

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
	activeDeviceIndex: number;
	scannedPeripherals: BleManagerDiscoverPeripheralResponse[];
	scanning: boolean;
	bond?: DeviceBondState;
	discover: DeviceDiscoverState;
}

export const devicesInitialState: DeviceState = {
	devices: [],
	activeDeviceIndex: -1,
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
	DeviceSetName &
	DeviceBreathingModesLoaded &
	DeviceConnected &
	DeviceDisconnected &
	DeviceConnectionRemove &
	DeviceConnectionRemoved &
	DeviceBatteryLoaded
	;

export const devicesReducer = (state: DeviceState = devicesInitialState, action: Action): DeviceState => {
	switch (action.type) {
		case SetActiveDevice:
			const activeDeviceIndex = state.devices.findIndex((device: Device) => device.uid === action.device.uid);
			return {
				...state,
				activeDeviceIndex,
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
		case DeviceBreathingModesLoaded:
			const devices = state.devices.map((device: Device) => {
				if (device.uid === action.peripheralUid) {
					return {
						...device,
						breathingModes: action.modes,
					}
				} else {
					return device;
				}
			});
			return {
				...state,
				devices,
			}
		case DeviceDisconnected:
		case DeviceConnected:
			const devices2 = state.devices.map((device: Device) => {
				if (device.uid === action.peripheralUid) {
					return {
						...device,
						connected: action.type === DeviceConnected,
					}
				} else {
					return device;
				}
			});
			return {
				...state,
				devices: devices2,
			}

		case DeviceConnectionRemove:
			const devices3 = state.devices.map((device: Device) => {
				if (device.uid === action.device.uid) {
					return {
						...device,
						disconnecting: true
					}
				} else {
					return device;
				}
			});
			return {
				...state,
				devices: devices3,
			}
		case DeviceConnectionRemoved:
			const filteredDevices = state.devices.filter((device: Device) => device.uid !== action.device.uid);
			return {
				...state,
				activeDeviceIndex: -1,
				devices: filteredDevices,
				bond: undefined,
			}

		case DeviceBatteryLoaded:
			const batteryLoadedDevice = state.devices.map((device: Device) => {
				if (device.uid === action.deviceUid) {
					return {
						...device,
						battery: action.battery,
					}
				} else {
					return device;
				}
			});
			return {
				...state,
				devices: batteryLoadedDevice,
			}
		default:
			return state;
	}
}
