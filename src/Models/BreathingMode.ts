
export interface BreathingDefinition {
	cycleSpeedStart: number;
	cycleSpeedEnd: number;
	duration: number;
	freqIn: number;
	freqHold1: number
	freqOut: number;
	freqHold2: number;
}

export interface BreathingMode {
	name: string;
	speed: {
		normal: BreathingDefinition;
	}
	//slow: BreathingDefinition;
	//fast: BreathingDefinition;
}
