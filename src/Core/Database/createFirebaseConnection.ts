import Firebase, { RNFirebase } from 'react-native-firebase';

const defaultConfig = {
    apiKey: "AIzaSyChxuB-ffqYONRMmuFnaax3HVSBjM_xr6Y",
    authDomain: "breathing-friend.firebaseapp.com",
    databaseURL: "https://breathing-friend.firebaseio.com",
    appId: "1:1070520182644:android:dd3062a955d93dbe",
    projectId: "breathing-friend",
    storageBucket: "breathing-friend.appspot.com",
    messagingSenderId: "1070520182644"
}

const defaultName = 'com.breathingfriend.remoteControl';

export interface FirebaseConnection  {
    firestore: RNFirebase.firestore.Firestore;
}

export const createFirebaseConnection = (config: any = defaultConfig, name: string = defaultName): FirebaseConnection => {
    Firebase.initializeApp(config, name);
    const firestore = Firebase.firestore();
    firestore.settings({
        timestampsInSnapshots: true,
    });
    return {
        firestore,
    }
}
