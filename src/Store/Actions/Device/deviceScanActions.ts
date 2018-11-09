import { BleManagerDiscoverPeripheralResponse } from "react-native-ble-manager";

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
	peripheral: BleManagerDiscoverPeripheralResponse;
}

export const availablePeripheralObtainedAction = (peripheral: BleManagerDiscoverPeripheralResponse): AvailablePeripheralObtained => ({
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
