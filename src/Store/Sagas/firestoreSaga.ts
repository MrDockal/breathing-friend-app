
import { put, takeEvery } from 'redux-saga/effects';
import { RNFirebase } from 'react-native-firebase';
import { BreathingInitLoad, BreathingInitLoadedAction } from '../Actions/breathingActions';
import { BreathingMode } from '../../Core/Entities/BreathingMode';

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
	];
}
