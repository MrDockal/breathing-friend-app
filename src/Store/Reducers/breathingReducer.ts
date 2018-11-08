import { BreathingMode } from "../../Core/Entities/BreathingMode";
import { AvailableBreathingInitLoaded } from "../Actions/breathingActions";

export interface BreathingState {
	modes: BreathingMode[];
}

export const breathingInitialState: BreathingState = {
	modes: [],
}

type Action = AvailableBreathingInitLoaded;

export const breathingReducer = (state: BreathingState = breathingInitialState, action: Action) => {
	switch (action.type) {
		case AvailableBreathingInitLoaded:
			return {
				...state,
				modes: action.modes,
			};
		default:
			return state;
	}
}
