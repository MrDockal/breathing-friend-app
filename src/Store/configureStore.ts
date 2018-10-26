import { combineReducers } from 'redux';
import { breathingReducer, BreathingState, breathingInitialState } from './Reducers/breathingReducer';

export interface State {
	breathing: BreathingState;
};

export const initialState = {
	breathing: breathingInitialState,
}

export const reducer = combineReducers<State>({
	breathing: breathingReducer,
});
