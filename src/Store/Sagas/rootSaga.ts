import { all } from 'redux-saga/effects';
import { firestoreSaga } from "./firestoreSaga";
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";
import { deviceSaga } from './deviceSaga';
import { BleAdapter } from '../../Core/Bluetooth/createBleAdapter';

export function* rootSagas(
	firebase: FirebaseConnection,
	bleAdapter: BleAdapter,
) {
	yield all([
		firestoreSaga(firebase.firestore),
		deviceSaga(bleAdapter),
	]);
}
