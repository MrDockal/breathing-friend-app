import { all } from 'redux-saga/effects';
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";
import { deviceSaga } from './deviceSaga';
import { BleAdapter } from '../../Core/Bluetooth/createBleAdapter';
import { breathingSaga } from './breathingSaga';
import { Dispatch } from 'redux';

export function* rootSagas(
	firebase: FirebaseConnection,
	bleAdapter: BleAdapter,
	dispatch: Dispatch,
) {
	yield bleAdapter.init();
	yield all([
		breathingSaga(firebase.firestore),
		deviceSaga(bleAdapter, dispatch),
	]);
}
