import { all } from 'redux-saga/effects';
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";
import { deviceSaga } from './deviceSaga';
import { breathingSaga } from './breathingSaga';
import { Dispatch } from 'redux';
import { AndroidBleAdapter } from '../../Core/Bluetooth/AndroidBleAdapter';
import { deviceBreathingModesSaga } from './deviceBreathingModesSaga';

export function* rootSagas(
	firebase: FirebaseConnection,
	bleAdapter: AndroidBleAdapter,
	dispatch: Dispatch,
) {
	yield all([
		breathingSaga(firebase.firestore),
		deviceBreathingModesSaga(bleAdapter),
		deviceSaga(bleAdapter, dispatch),
	]);
}
