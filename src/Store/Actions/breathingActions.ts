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

/** --- Breathing.Purge --- */

/** GET */
export const FirestoreReinitialize = "Firestore.Reinitialize";
export interface FirestoreReinitialize {
	type: typeof FirestoreReinitialize;
}

export const FirestoreReinitializeAction = (): FirestoreReinitialize => ({
	type: FirestoreReinitialize,
});

	/** RESPONSE */
export const FirestoreReinitialized = "Firestore.Reinitialized";
export interface FirestoreReinitialized {
	type: typeof FirestoreReinitialized;
}

export const FirestoreReinitializedAction = (): FirestoreReinitialized => ({
	type: FirestoreReinitialized,
});
