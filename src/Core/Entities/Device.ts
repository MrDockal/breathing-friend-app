import { DeviceSavedBreathingMode } from "./BreathingMode";

export interface Device {
	uid: string;
	name: string;
	connected: boolean;
	breathingModes: DeviceSavedBreathingMode[];
}
