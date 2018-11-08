import { BreathingSpeed } from "./BreathingMode";

export interface DeviceBreathingMode {
	uid: string;
	speed: keyof BreathingSpeed;
}

export interface Device {
	uid: string;
	name: string;
	connected: boolean;
	breathingModes: DeviceBreathingMode[];
}