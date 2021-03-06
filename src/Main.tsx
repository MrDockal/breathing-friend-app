import React from 'react';
import Navigator from './Navigators/Navigators';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store } from 'redux';
import { reducer } from './Store/configureStore';
import { rootSagas } from './Store/Sagas/rootSaga';
import { createFirebaseConnection } from './Core/Database/createFirebaseConnection';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, Persistor } from 'redux-persist';
import { DEVICE_SERVICE, BREATHING_SERVICE, STATS_SERVICE, BATTERY_SERVICE, CURRENT_TIME_SERVICE } from './Core/Bluetooth/BLEConstants';
import { AndroidBleAdapter } from './Core/Bluetooth/AndroidBleAdapter';

export default class App extends React.Component<{}, {}> {

	private readonly store: Store;
	private readonly persistor: Persistor;

	public constructor(props: {}) {
		super(props);
		const firebase = createFirebaseConnection();
		const bleAdapter = new AndroidBleAdapter([DEVICE_SERVICE, BREATHING_SERVICE, STATS_SERVICE, BATTERY_SERVICE, CURRENT_TIME_SERVICE]);
		const sagaMiddleware = createSagaMiddleware();
		this.store = createStore(
			reducer,
			applyMiddleware(sagaMiddleware),
		);
		this.persistor = persistStore(this.store);
		sagaMiddleware.run(() => rootSagas(firebase, bleAdapter, this.store.dispatch));
	}

	public render() {
		return (
			<Provider store={this.store}>
				<PersistGate loading={null} persistor={this.persistor}>
					<Navigator />
				</PersistGate>
			</Provider>
		);
	}
}
