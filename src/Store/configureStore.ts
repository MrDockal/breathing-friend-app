import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { breathingReducer, BreathingState, breathingInitialState } from './Reducers/breathingReducer';
import { DeviceState, devicesInitialState, devicesReducer } from './Reducers/deviceReducer';
import { createFilter, createWhitelistFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
import { statsReducer, StatsState, statsInitialState } from './Reducers/statsReducer';

export interface State {
	breathing: BreathingState;
	device: DeviceState;
	stats: StatsState;
};

const config = {
	key: 'primary15',
	storage,
	blacklist: ['breathing'],
	transforms: [
		createWhitelistFilter(`device.devices`),
		createWhitelistFilter(`stats`),
	]
}

const configDev = {
	key: 'primaryDev3',
	storage,
	blacklist: ['breathing', 'device'],
}

export const initialState = {
	breathing: breathingInitialState,
	device: devicesInitialState,
	stats: statsInitialState,
}

const rootReducer = combineReducers<State>({
	breathing: breathingReducer,
	device: devicesReducer,
	stats: statsReducer,
});

export const reducer = persistReducer(config, rootReducer);
