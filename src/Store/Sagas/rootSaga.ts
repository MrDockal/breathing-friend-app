import { all } from 'redux-saga/effects';
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";
import { deviceSaga } from './deviceSaga';
import { breathingSaga } from './breathingSaga';
import { Dispatch } from 'redux';
import { AndroidBleAdapter } from '../../Core/Bluetooth/AndroidBleAdapter';

export function* rootSagas(
	firebase: FirebaseConnection,
	bleAdapter: AndroidBleAdapter,
	dispatch: Dispatch,
) {
	yield all([
		breathingSaga(firebase.firestore),
		deviceSaga(bleAdapter, dispatch),
	]);
}
