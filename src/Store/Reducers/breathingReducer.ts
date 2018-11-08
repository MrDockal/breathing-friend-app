import { BreathingMode, SavedBreathingMode } from "../../Core/Entities/BreathingMode";
import { AvailableBreathingInitLoaded, SavedBreathingInitLoaded } from "../Actions/breathingActions";

export interface BreathingState {
	modes: BreathingMode[];
	savedModes: SavedBreathingMode[];
}

export const breathingInitialState: BreathingState = {
	modes: [],
	savedModes: [],
}

type Action = AvailableBreathingInitLoaded & SavedBreathingInitLoaded;

export const breathingReducer = (state: BreathingState = breathingInitialState, action: Action) => {
	switch (action.type) {
		case AvailableBreathingInitLoaded:
			return {
				...state,
				modes: action.modes,
			};
		case SavedBreathingInitLoaded:
			return {
				...state,
				savedModes: action.savedModes,
			}
		default:
			return state;
	}
}
