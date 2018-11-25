import { Device } from "../../../Core/Entities/Device";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";

/** DISCOVER BONDED DEVICES */
export const DiscoverBondedDevices = "Device.Bond.Discover";
export interface DiscoverBondedDevices {
	type: typeof DiscoverBondedDevices;
}

export const discoverBondedDevicesAction = (): DiscoverBondedDevices => ({
	type: DiscoverBondedDevices,
});

/** PAUSE DISCOVER BONDED DEVICES */
export const PauseDiscoverBondedDevices = "Pause.Device.Bond.Discover";
export interface PauseDiscoverBondedDevices {
	type: typeof PauseDiscoverBondedDevices;
}

export const pauseDiscoverBondedDevicesAction = (): PauseDiscoverBondedDevices => ({
	type: PauseDiscoverBondedDevices,
});

/** WATCH DEVICE CONNECTION CHANGES */
export const WatchDeviceConnectionChanges = "Device.Connection.Watch";
export interface WatchDeviceConnectionChanges {
	type: typeof WatchDeviceConnectionChanges;
	device: Device;
}

export const WatchDeviceConnectionChangesAction = (device: Device): WatchDeviceConnectionChanges => ({
	type: WatchDeviceConnectionChanges,
	device,
});


/** SCAN STOP */
export const DiscoveredBondedDevices = "Device.Bond.Discovered";
export interface DiscoveredBondedDevices {
	type: typeof DiscoveredBondedDevices;
	devices: Device[];
}

export const discoveredBondedDevicesAction = (devices: Device[]): DiscoveredBondedDevices => ({
	type: DiscoveredBondedDevices,
	devices,
});

/** BONDING START */
export const PeripheralBondStart = "Device.Bond.Start";
export interface PeripheralBondStart {
	type: typeof PeripheralBondStart;
	peripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralBondStartAction = (peripheral: BleManagerDiscoverPeripheralResponse): PeripheralBondStart => ({
	type: PeripheralBondStart,
	peripheral,
});

/** BONDING SUCCEEDED */
export const PeripheralBondSucceeded = "Device.Bond.Succeeded";
export interface PeripheralBondSucceeded {
	type: typeof PeripheralBondSucceeded;
	bondedPeripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralBondSucceededAction = (bondedPeripheral: BleManagerDiscoverPeripheralResponse): PeripheralBondSucceeded => ({
	type: PeripheralBondSucceeded,
	bondedPeripheral,
});

/** BONDING FAILED */
export const PeripheralBondFailed = "Device.Bond.Failed";
export interface PeripheralBondFailed {
	type: typeof PeripheralBondFailed;
	peripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralBondFailedAction = (peripheral: BleManagerDiscoverPeripheralResponse): PeripheralBondFailed => ({
	type: PeripheralBondFailed,
	peripheral,
});


/** REMOVE BOND */
export const PeripheralRemoveBond = "Device.Bond.Remove";
export interface PeripheralRemoveBond {
	type: typeof PeripheralRemoveBond;
	peripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralRemoveBondAction = (peripheral: BleManagerDiscoverPeripheralResponse): PeripheralRemoveBond => ({
	type: PeripheralRemoveBond,
	peripheral,
});

/** REMOVE BOND SUCCEEDED */
export const PeripheralBondRemoved = "Device.Bond.Removed";
export interface PeripheralBondRemoved {
	type: typeof PeripheralBondRemoved;
	bondedPeripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralBondRemovedAction = (bondedPeripheral: BleManagerDiscoverPeripheralResponse): PeripheralBondRemoved => ({
	type: PeripheralBondRemoved,
	bondedPeripheral,
});

/** REMOVE BOND FAILED */
export const PeripheralBondRemoveFailed = "Device.Bond.RemoveFailed";
export interface PeripheralBondRemoveFailed {
	type: typeof PeripheralBondRemoveFailed;
	peripheral: BleManagerDiscoverPeripheralResponse;
}

export const peripheralBondRemoveFailedAction = (peripheral: BleManagerDiscoverPeripheralResponse): PeripheralBondRemoveFailed => ({
	type: PeripheralBondRemoveFailed,
	peripheral,
});

/** DEVICE CONNECTED */
export const DeviceConnected = "Device.Connected";
export interface DeviceConnected {
	type: typeof DeviceConnected;
	peripheralUid: string;
}

export const DeviceConnectedAction = (peripheralUid: string): DeviceConnected => ({
	type: DeviceConnected,
	peripheralUid,
});

/** DEVICE DISCONNECTED */
export const DeviceDisconnected = "Device.Disconnected";
export interface DeviceDisconnected {
	type: typeof DeviceDisconnected;
	peripheralUid: string;
}

export const DeviceDisconnectedAction = (peripheralUid: string): DeviceDisconnected => ({
	type: DeviceDisconnected,
	peripheralUid,
});
