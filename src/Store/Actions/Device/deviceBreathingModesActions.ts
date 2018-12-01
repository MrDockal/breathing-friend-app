import { DeviceSavedBreathingMode, BreathingMode } from "../../../Core/Entities/BreathingMode";
import { Statistics } from "../../../Core/Entities/Statistics";
import { Device } from "../../../Core/Entities/Device";

/** --- LOAD DEVICE BREATHING MODES --- */

export const DeviceBreathingModesLoad = "Device.BreathingModes.Load";
export interface DeviceBreathingModesLoad {
	type: typeof DeviceBreathingModesLoad;
	peripheralUid: string;
}

export const DeviceBreathingModesLoadAction = (peripheralUid: string): DeviceBreathingModesLoad => ({
	type: DeviceBreathingModesLoad,
	peripheralUid,
});

/** --- DEVICE BREATHING MODES LOADED --- */

export const DeviceBreathingModesLoaded = "Device.BreathingModes.Loaded";
export interface DeviceBreathingModesLoaded {
	type: typeof DeviceBreathingModesLoaded;
	modes: DeviceSavedBreathingMode[];
	peripheralUid: string;
}

export const DeviceBreathingModesLoadedAction = (peripheralUid: string, modes: DeviceSavedBreathingMode[]): DeviceBreathingModesLoaded => ({
	type: DeviceBreathingModesLoaded,
	modes,
	peripheralUid,
});


/** --- LOAD DEVICE BREATHING MODES STATISTICS --- */

export const DeviceBreathingModesStatsLoad = "Device.BreathingModesStats.Load";
export interface DeviceBreathingModesStatsLoad {
	type: typeof DeviceBreathingModesStatsLoad;
	peripheralUid: string;
}

export const DeviceBreathingModesStatsLoadAction = (peripheralUid: string): DeviceBreathingModesStatsLoad => ({
	type: DeviceBreathingModesStatsLoad,
	peripheralUid,
});

/** --- DEVICE BREATHING MODES STATISTICS LOADED --- */

export const DeviceBreathingModesStatsLoaded = "Device.BreathingModesStats.Loaded";
export interface DeviceBreathingModesStatsLoaded {
	type: typeof DeviceBreathingModesStatsLoaded;
	stats: Statistics[];
	peripheralUid: string;
}

export const DeviceBreathingModesStatsLoadedAction = (peripheralUid: string, stats: Statistics[]): DeviceBreathingModesStatsLoaded => ({
	type: DeviceBreathingModesStatsLoaded,
	stats,
	peripheralUid,
});

/** UPDATE */
export const DeviceBreathingModeUpdate = "Device.Breathing.Update";
export interface DeviceBreathingModeUpdate {
	type: typeof DeviceBreathingModeUpdate;
	mode: DeviceSavedBreathingMode;
	index: number;
}

export const DeviceBreathingModeUpdateAction = (mode: DeviceSavedBreathingMode, index: number): DeviceBreathingModeUpdate => ({
	type: DeviceBreathingModeUpdate,
	mode,
	index,
});

/** UPDATE */
export const DeviceBreathingModeUpdated = "Device.Breathing.Updated";
export interface DeviceBreathingModeUpdated {
	type: typeof DeviceBreathingModeUpdated;
	mode: DeviceSavedBreathingMode;
	index: number;
}

export const DeviceBreathingModeUpdatedAction = (mode: DeviceSavedBreathingMode, index: number): DeviceBreathingModeUpdated => ({
	type: DeviceBreathingModeUpdated,
	mode,
	index,
});

/** LOAD BATTERY LEVEL */
export const DeviceBatteryLoaded = "Device.Battery.Loaded";
export interface DeviceBatteryLoaded {
	type: typeof DeviceBatteryLoaded;
	battery: string;
	deviceUid: string;
}

export const DeviceBatteryLoadedAction = (deviceUid: string, battery: string): DeviceBatteryLoaded => ({
	type: DeviceBatteryLoaded,
	battery,
	deviceUid
});
