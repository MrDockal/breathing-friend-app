import Firebase, { RNFirebase } from 'react-native-firebase';
import { defaultConfig } from '../../config';

const defaultName = 'com.breathingfriend.remoteControl';

export interface FirebaseConnection  {
    firestore: RNFirebase.firestore.Firestore;
}

export const createFirebaseConnection = (config: any = defaultConfig.firebase, name: string = defaultName): FirebaseConnection => {
    console.log('config', config);
    let app;
    try {
        app = Firebase.app(name);
    } catch(e) {
        app = Firebase.initializeApp(config, name);
    }
    const firestore = app.firestore();
    firestore.settings({
        timestampsInSnapshots: true,
    });
    return {
        firestore,
    }
}
