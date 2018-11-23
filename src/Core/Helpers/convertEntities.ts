import { DeviceSavedBreathingMode, BreathingSpeed, BreathingDefinition } from "../Entities/BreathingMode";

type RawData = string[];

// DATA LOOK LIKE THIS  [["271",0,2,2,2,2,2,2,2],["272",0,3,3,3,3,3,3,3],["273",0,4,4,4,4,4,4,4]];
export const decodeDeviceBreathingModes = (data: RawData[]): DeviceSavedBreathingMode[] => {
	const modes = data.map((rawData: RawData): DeviceSavedBreathingMode => {
		const speed = numberToBreathingConverter(parseInt(rawData[1]));
		return {
			uid: rawData[0],
			speed,
		}
	});
	return modes;
}

export const encodeDeviceBreathingMode = (breathingUid: string, speed: keyof BreathingSpeed, modeDefinition: BreathingDefinition) => {
	return [
		breathingUid,
		breathingToNumberConverter(speed),
		modeDefinition.cycleSpeedStart,
		modeDefinition.cycleSpeedEnd,
		modeDefinition.duration,
		modeDefinition.freqIn,
		modeDefinition.freqHold1,
		modeDefinition.freqOut,
		modeDefinition.freqHold2,
	];
}

export const breathingToNumberConverter = (breathingSpeed: keyof BreathingSpeed) => {
	switch (breathingSpeed) {
		case 'slow':
			return 0;
		case 'normal':
			return 1;
		case 'fast':
			return 2;
		default:
			console.warn(`Unknown speed ${breathingSpeed}`);
			return 1;
	}
}

export const numberToBreathingConverter = (value: number): keyof BreathingSpeed => {
	switch (value) {
		case 0:
			return 'slow';
		case 1:
			return 'normal';
		case 2:
			return 'fast';
		default:
			console.warn(`Unknown speed ${value}`);
			return 'normal';
	}
}
