import { put, takeEvery } from 'redux-saga/effects';
import { RNFirebase } from 'react-native-firebase';
import { BreathingInitLoad, BreathingInitLoadedAction, BreathingReinitialize, BreathingReinitializedAction } from '../Actions/breathingActions';
import { BreathingMode } from '../../Core/Entities/BreathingMode';
import { breathingModes } from '../../Core/Mocks/breathingModes';

export function* breathingSaga(firestore: RNFirebase.firestore.Firestore) {
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
		yield takeEvery(BreathingReinitialize, function* (_action: BreathingReinitialize) {
			const created = breathingModes.map((mode: BreathingMode) => (
				breathingModesCollection.add(mode)
			));
			yield Promise.all(created);
			yield put(BreathingReinitializedAction());
		})
	];
}
