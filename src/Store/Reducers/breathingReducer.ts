import { BreathingMode, SavedBreathingMode } from "../../Core/Entities/BreathingMode";
import { BreathingInitLoaded } from "../Actions/breathingActions";

export interface BreathingState {
	modes: BreathingMode[];
	savedModes: SavedBreathingMode[];
}

export const breathingInitialState: BreathingState = {
	modes: [],
	savedModes: [],
}

type Action = BreathingInitLoaded;

export const breathingReducer = (state: BreathingState = breathingInitialState, action: Action) => {
	switch (action.type) {
		case BreathingInitLoaded:
			return {
				...state,
				modes: action.modes,
			};
		default:
			return state;
	}
}
