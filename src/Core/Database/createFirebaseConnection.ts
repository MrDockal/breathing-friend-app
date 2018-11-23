import Firebase, { RNFirebase } from 'react-native-firebase';
import { defaultConfig } from '../../config';

const defaultName = 'com.breathingfriend.remoteControl';

export interface FirebaseConnection  {
    firestore: RNFirebase.firestore.Firestore;
}

export const createFirebaseConnection = (config: any = defaultConfig.firebase, name: string = defaultName): FirebaseConnection => {
    try {
        Firebase.app(name);
    } catch(e) {
        Firebase.initializeApp(config, name);
    }
    const firestore = Firebase.firestore();
    firestore.settings({
        timestampsInSnapshots: true,
    });
    return {
        firestore,
    }
}
