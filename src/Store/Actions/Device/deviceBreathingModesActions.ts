import { DeviceSavedBreathingMode } from "../../../Core/Entities/BreathingMode";
import { Statistics } from "../../../Core/Entities/Statistics";

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
