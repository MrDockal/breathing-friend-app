import { BreathingMode, BreathingSpeed } from "../Entities/BreathingMode";

export const findBreathingModeDefinitionByUidAndSpeed = (modes: BreathingMode[], uid: string, speed: keyof BreathingSpeed) => {
	const found = modes.find((mode: BreathingMode) => mode.uid === uid);
	if (!found) {
		throw new Error('Could not find BreathingModeDefinition ByUid And Speed');
	}
	return found.speed[speed];
}
