import { combineReducers } from 'redux';
import { breathingReducer, BreathingState, breathingInitialState } from './Reducers/breathingReducer';
import { DeviceState, devicesInitialState, devicesReducer } from './Reducers/devicesReducer';

export interface State {
	breathing: BreathingState;
	device: DeviceState;
};

export const initialState = {
	breathing: breathingInitialState,
	device: devicesInitialState,
}

export const reducer = combineReducers<State>({
	breathing: breathingReducer,
	device: devicesReducer,
});
