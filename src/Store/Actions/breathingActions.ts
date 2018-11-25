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
export const AvailableBreathingInitLoaded = "Breathing.Available.Loaded";
export interface AvailableBreathingInitLoaded {
	type: typeof AvailableBreathingInitLoaded;
	modes: BreathingMode[];
}

export const BreathingInitLoadedAction = (modes: BreathingMode[]): AvailableBreathingInitLoaded => ({
	type: AvailableBreathingInitLoaded,
	modes,
});

/** --- Breathing.Purge --- */

/** GET */
export const BreathingReinitialize = "Breathing.Reinitialize";
export interface BreathingReinitialize {
	type: typeof BreathingReinitialize;
}

export const BreathingReinitializeAction = (): BreathingReinitialize => ({
	type: BreathingReinitialize,
});

/** RESPONSE */
export const BreathingReinitialized = "Breathing.Reinitialized";
export interface BreathingReinitialized {
	type: typeof BreathingReinitialized;
}

export const BreathingReinitializedAction = (): BreathingReinitialized => ({
	type: BreathingReinitialized,
});
