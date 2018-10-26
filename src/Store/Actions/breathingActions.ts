import { BreathingMode } from "../../Core/Entities/BreathingMode";

/** --- Breathing.Init --- */

	/** GET */
export const BreathingInitLoad = "Breathing.Init.Load";
export interface BreathingInitLoad {
	type: typeof BreathingInitLoad;
}

export const BreathingInitLoadAction = (): BreathingInitLoad => ({
	type: BreathingInitLoad,
});

	/** RESPONSE */
export const BreathingInitLoaded = "Breathing.Init.Loaded";
export interface BreathingInitLoaded {
	type: typeof BreathingInitLoaded;
	modes: BreathingMode[];
}

export const BreathingInitLoadedAction = (modes: BreathingMode[]): BreathingInitLoaded => ({
	type: BreathingInitLoaded,
	modes,
});