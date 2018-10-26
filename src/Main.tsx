import React from 'react';
import { TabNavigation } from './Components/TabNavigation';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store } from 'redux';
import { reducer, initialState } from './Store/configureStore';
import { rootSagas } from './Store/Sagas/rootSaga';
import { createFirebaseConnection } from './Core/Database/createFirebaseConnection';
import { BreathingInitLoadAction } from './Store/Actions/breathingActions';

export default class App extends React.Component<{}, {}> {

	private readonly store: Store;

	public constructor(props: {}) {
		super(props);
		const firebase = createFirebaseConnection();
		const sagaMiddleware = createSagaMiddleware();
		this.store = createStore(
			reducer,
			initialState,
			applyMiddleware(sagaMiddleware)
		);
		sagaMiddleware.run(() => rootSagas(firebase));
		this.store.dispatch(BreathingInitLoadAction());
	}

	public componentDidMount() {
		SplashScreen.hide();
	}

	public render() {
		return (
			<Provider store={this.store}>
				<TabNavigation/>
			</Provider>
		);
	}
}
