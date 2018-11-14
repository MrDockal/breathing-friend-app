import { DeviceSavedBreathingMode } from "../../../Core/Entities/BreathingMode";

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
