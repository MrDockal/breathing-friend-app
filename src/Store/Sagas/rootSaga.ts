import { all } from 'redux-saga/effects';
import { firestoreSaga } from "./firestoreSaga";
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";

export function* rootSagas(
	firebase: FirebaseConnection,
) {
	yield all([
		firestoreSaga(firebase.firestore),
	]);
}
