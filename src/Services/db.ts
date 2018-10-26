import Firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
    apiKey: "AIzaSyChxuB-ffqYONRMmuFnaax3HVSBjM_xr6Y",
    authDomain: "breathing-friend.firebaseapp.com",
    databaseURL: "https://breathing-friend.firebaseio.com",
    projectId: "breathing-friend",
    storageBucket: "breathing-friend.appspot.com",
    messagingSenderId: "1070520182644"
}

Firebase.initializeApp(config);
const db = Firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});
export default db;
