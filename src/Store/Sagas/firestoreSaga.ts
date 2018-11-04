import { put, takeEvery } from 'redux-saga/effects';
import { RNFirebase } from 'react-native-firebase';
import { BreathingInitLoad, BreathingInitLoadedAction, FirestoreReinitialize, FirestoreReinitializedAction } from '../Actions/breathingActions';
import { BreathingMode } from '../../Core/Entities/BreathingMode';
import { breathingModes } from '../../Core/Mocks/breathingModes';

export function* firestoreSaga (firestore: RNFirebase.firestore.Firestore) {
	const breathingModesCollection = firestore.collection('breathing-modes');
	return [
		yield takeEvery(BreathingInitLoad, function* (_action: BreathingInitLoad) {
			const modes = yield breathingModesCollection.get();
			const breathingModes: BreathingMode[] = [];
			modes.forEach((mode: RNFirebase.firestore.DocumentSnapshot) => {
				breathingModes.push(mode.data() as BreathingMode);
			});
			yield put(BreathingInitLoadedAction(breathingModes));
		}),
		yield takeEvery(FirestoreReinitialize, function* (_action: FirestoreReinitialize) {
			const created = breathingModes.map((mode: BreathingMode) => (
				breathingModesCollection.add(mode)
			));
			yield Promise.all(created);
			yield put(FirestoreReinitializedAction());
		})
	];
}
