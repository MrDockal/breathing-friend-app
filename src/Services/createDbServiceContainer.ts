import { RNFirebase } from 'react-native-firebase';
import { BreathingMode } from '../Models/BreathingMode';


export const createDbServiceContainer = (db: RNFirebase.firestore.Firestore) => {
	const breathingModesCollection = db.collection('breathing-modes');
	return {
		getAllBreathingModes: async(): Promise<BreathingMode[]> => {
			const modes = await breathingModesCollection.get();
			const breathingModes: BreathingMode[] = [];
			modes.forEach((mode: RNFirebase.firestore.DocumentSnapshot) => {
				breathingModes.push(mode.data() as BreathingMode);
			});
			return breathingModes;
		}
	}
}