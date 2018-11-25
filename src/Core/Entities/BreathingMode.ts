
export interface BreathingDefinition {
	cycleSpeedStart: number;
	cycleSpeedEnd: number;
	duration: number;
	freqIn: number;
	freqHold1: number;
	freqOut: number;
	freqHold2: number;
}

export interface BreathingSpeed {
	normal: BreathingDefinition;
	slow: BreathingDefinition;
	fast: BreathingDefinition;
}

export interface BreathingMode {
	uid: string;
	name: string;
	speed: BreathingSpeed;
}

export interface DeviceSavedBreathingMode {
	uid: string;
	speed: keyof BreathingSpeed;
}

export interface DeviceToBeSavedBreathingMode {
	uid: string;
	speed: keyof BreathingSpeed;
	mode: BreathingDefinition;
}
