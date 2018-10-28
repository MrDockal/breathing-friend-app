import React from 'react';
import Navigator from './Navigators/Navigators';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store } from 'redux';
import { reducer, initialState } from './Store/configureStore';
import { rootSagas } from './Store/Sagas/rootSaga';
import { createFirebaseConnection } from './Core/Database/createFirebaseConnection';
import { BreathingInitLoadAction } from './Store/Actions/breathingActions';
import { Device } from './Core/Entities/Device';

export default class App extends React.Component<{}, {}> {

	private readonly store: Store;

	public constructor(props: {}) {
		super(props);
		const firebase = createFirebaseConnection();
		const sagaMiddleware = createSagaMiddleware();
		const device: Device = {
			name: 'Mišák',
			uid: '017ab2',
		}
		this.store = createStore(
			reducer,
			{
				...initialState,
				device: {
					...initialState.device,
					devices: [
						...initialState.device.devices,
						device,
					]
				}
			},
			applyMiddleware(sagaMiddleware)
		);
		sagaMiddleware.run(() => rootSagas(firebase));
		this.store.dispatch(BreathingInitLoadAction());
	}

	public render() {
		return (
			<Provider store={this.store}>
				<Navigator/>
			</Provider>
		);
	}
}
