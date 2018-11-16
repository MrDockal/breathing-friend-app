import { BreathingMode } from "../Entities/BreathingMode";

export const breathingModes: BreathingMode[] = [{
	uid: 'abc01',
	name: 'Odpočiň si',
	speed: {
		fast: {
			duration: 30,
			cycleSpeedEnd: 3.75,
			cycleSpeedStart: 5,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
		normal: {
			duration: 30,
			cycleSpeedEnd: 4.26,
			cycleSpeedStart: 6,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
		slow: {
			duration: 30,
			cycleSpeedEnd: 5,
			cycleSpeedStart: 7.5,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
	}
}, {
	uid: 'abc02',
	name: 'Chvilka pro tebe',
	speed: {
		fast: {
			duration: 10,
			cycleSpeedEnd: 5,
			cycleSpeedStart: 5,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
		normal: {
			duration: 10,
			cycleSpeedEnd: 6,
			cycleSpeedStart: 6,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
		slow: {
			duration: 10,
			cycleSpeedEnd: 7.5,
			cycleSpeedStart: 7.5,
			freqIn: 1,
			freqHold1: 0,
			freqOut: 2,
			freqHold2: 0,
		},
	}
}, {
	uid: 'abc03',
	name: 'Sladké sny',
	speed: {
		fast: {
			duration: 0.9333333333,
			cycleSpeedEnd: 14,
			cycleSpeedStart: 14,
			freqIn: 3,
			freqHold1: 5,
			freqOut: 6,
			freqHold2: 0,
		},
		normal: {
			duration: 1.2666666666,
			cycleSpeedEnd: 19,
			cycleSpeedStart: 19,
			freqIn: 4,
			freqHold1: 7,
			freqOut: 8,
			freqHold2: 0,
		},
		slow: {
			duration: 1.5333333333,
			cycleSpeedEnd: 23,
			cycleSpeedStart: 23,
			freqIn: 5,
			freqHold1: 8,
			freqOut: 10,
			freqHold2: 0,
		},
	}
}, {
	uid: 'abc04',
	name: 'Rozdýchej to',
	speed: {
		fast: {
			duration: 10,
			cycleSpeedEnd: 10,
			cycleSpeedStart: 10,
			freqIn: 3,
			freqHold1: 2,
			freqOut: 3,
			freqHold2: 2,
		},
		normal: {
			duration: 10,
			cycleSpeedEnd: 12,
			cycleSpeedStart: 12,
			freqIn: 4,
			freqHold1: 2,
			freqOut: 4,
			freqHold2: 2,
		},
		slow: {
			duration: 10,
			cycleSpeedEnd: 14,
			cycleSpeedStart: 14,
			freqIn: 5,
			freqHold1: 2,
			freqOut: 5,
			freqHold2: 2,
		},
	}
}];
