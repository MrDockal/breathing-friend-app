import { firestoreSaga } from "./firestoreSaga";
import { FirebaseConnection } from "../../Core/Database/createFirebaseConnection";

export function* rootSagas(
	firebase: FirebaseConnection,
) {
	yield [
		firestoreSaga(firebase.firestore),
	];
}
