import { BreathingMode, SavedBreathingMode } from "../../Core/Entities/BreathingMode";

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

	/** RESPONSE SAVED */
export const SavedBreathingInitLoaded = "Breathing.Saved.Loaded";
export interface SavedBreathingInitLoaded {
	type: typeof SavedBreathingInitLoaded;
	savedModes: SavedBreathingMode[];
}

export const SavedBreathingInitLoadedAction = (savedModes: SavedBreathingMode[]): SavedBreathingInitLoaded => ({
	type: SavedBreathingInitLoaded,
	savedModes,
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
