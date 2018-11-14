import { BreathingMode, DeviceSavedBreathingMode, BreathingSpeed } from "../Entities/BreathingMode";

type RawData = string[];

// DATA LOOK LIKE THIS  [["271",0,2,2,2,2,2,2,2],["272",0,3,3,3,3,3,3,3],["273",0,4,4,4,4,4,4,4]];
export const getDeviceBreathingModes = (data: RawData[]): DeviceSavedBreathingMode[] => {
	const modes = data.map((rawData: RawData): DeviceSavedBreathingMode => {
		const speed: keyof BreathingSpeed = (() => {
			switch (rawData[1].toString()) {
				case '0':
					return 'slow';
				case '1':
					return 'normal';
				case '2':
					return 'fast';
				default:
					return 'normal';
			}
		})();
		return {
			uid: rawData[0],
			speed,
		}
	});
	return modes;
}
