import Firebase from 'react-native-firebase';

const config = {
    apiKey: "AIzaSyChxuB-ffqYONRMmuFnaax3HVSBjM_xr6Y",
    authDomain: "breathing-friend.firebaseapp.com",
    databaseURL: "https://breathing-friend.firebaseio.com",
    appId: "1:1070520182644:android:dd3062a955d93dbe",
    projectId: "breathing-friend",
    storageBucket: "breathing-friend.appspot.com",
    messagingSenderId: "1070520182644"
}

Firebase.initializeApp(config, 'com.breathingfriend.remoteControl');
const db = Firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});
export default db;
