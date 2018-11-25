import { DeviceSavedBreathingMode, BreathingMode, BreathingSpeed } from "../Entities/BreathingMode";

export interface ActiveBreathingModes extends BreathingMode {
	activeSpeed: keyof BreathingSpeed
}

export const getActiveBreathingModes = (savedModes: DeviceSavedBreathingMode[], allModes: BreathingMode[]): ActiveBreathingModes[] => {
	const activeModesUids = savedModes.map((mode: DeviceSavedBreathingMode) => mode.uid);
	return activeModesUids.map((modeUid: string) => {
		const mode = allModes.find((mode: BreathingMode) => mode.uid === modeUid);
		if (!mode) {
			throw new Error('prepareBreathingModes, could not find matching breathing mode');
		}
		return {
			...mode,
			activeSpeed: savedModes.find((savedMode: DeviceSavedBreathingMode) => savedMode.uid === mode.uid)!.speed
		}
	});
}
