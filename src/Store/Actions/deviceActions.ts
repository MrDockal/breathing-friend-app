import { Device } from "../../Core/Entities/Device";
import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";
import { ScanForPeripheralResponse } from "../../Core/Bluetooth/createBleAdapter";

/** SET */
export const SetActiveDevice = "Device.Set.Active";
export interface SetActiveDevice {
	type: typeof SetActiveDevice;
	device: Device;
}

export const setActiveDeviceAction = (device: Device): SetActiveDevice => ({
	type: SetActiveDevice,
	device,
});


/** SCAN */
export const ScanForAvailablePeripherals = "Device.Scan.Available";
export interface ScanForAvailablePeripherals {
	type: typeof ScanForAvailablePeripherals;
}

export const scanForAvailablePeripheralsAction = (): ScanForAvailablePeripherals => ({
	type: ScanForAvailablePeripherals,
});

/** SCAN STOP */
export const StopScanForAvailablePeripherals = "Device.StopScan.Available";
export interface StopScanForAvailablePeripherals {
	type: typeof StopScanForAvailablePeripherals;
}

export const stopScanForAvailablePeripheralsAction = (): StopScanForAvailablePeripherals => ({
	type: StopScanForAvailablePeripherals,
});

/** SCAN RESPONSE */
export const AvailablePeripheralObtained = "Device.Scanned.Available";
export interface AvailablePeripheralObtained {
	type: typeof AvailablePeripheralObtained;
	peripheral: ScanForPeripheralResponse;
}

export const availablePeripheralObtainedAction = (peripheral: ScanForPeripheralResponse): AvailablePeripheralObtained => ({
	type: AvailablePeripheralObtained,
	peripheral,
});

/** CLEAR SCANNED PERIPHERALS */
export const CleanScannedPeripherals = "Device.Scanned.Clear";
export interface CleanScannedPeripherals {
	type: typeof CleanScannedPeripherals;
}

export const cleanScannedPeripheralsAction = (): CleanScannedPeripherals => ({
	type: CleanScannedPeripherals,
});

/** SCAN STOPPED */
export const PeripheralScanStopped = "Device.Scan.Stopped";
export interface PeripheralScanStopped {
	type: typeof PeripheralScanStopped;
}

export const peripheralScanStoppedAction = (): PeripheralScanStopped => ({
	type: PeripheralScanStopped,
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
