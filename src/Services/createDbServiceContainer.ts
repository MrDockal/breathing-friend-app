import Firebase from 'firebase';
import { BreathingMode } from '../Models/BreathingMode';

export const createDbServiceContainer = (db: Firebase.firestore.Firestore) => {
	const breathingModesCollection = db.collection('breathing-modes');
	return {
		getAllBreathingModes: async(): Promise<BreathingMode[]> => {
			const modes = await breathingModesCollection.get();
			const breathingModes: BreathingMode[] = [];
			modes.forEach((mode: Firebase.firestore.QueryDocumentSnapshot) => {
				breathingModes.push(mode.data() as BreathingMode);
			});
			return breathingModes;
		}
	}
}