import { DeviceSavedBreathingMode } from "../Entities/BreathingMode";
import { ColorTheme } from "../../Components/BackgroundGradient/BackgroundGradient";

export const getBreathingThemeByIndex = (index?: number): ColorTheme => {
	switch (index) {
		case 0:
			return 'red';
		case 1:
			return 'blue';
		case 2:
			return 'orange';
		default:
			return 'black';
	}
}

export const getBreathingModeByStateAndUid = (modes: DeviceSavedBreathingMode[]) => (uid: string) => {
	const index = modes.findIndex((mode: DeviceSavedBreathingMode) => mode.uid === uid);
	return getBreathingThemeByIndex(index);
}
