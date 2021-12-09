import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDlbpWOhslS6mMwGa9nH8Lyy8n3zurP9aY",
  authDomain: "crudc-binnarium.firebaseapp.com",
  projectId: "crudc-binnarium",
  storageBucket: "crudc-binnarium.appspot.com",
  messagingSenderId: "1047657417633",
  appId: "1:1047657417633:web:abf9de8f17b9abf94919e0"
};

firebase.initializeApp(firebaseConfig);
export {firebase}
//const auth = getAuth()
//const database = getFirestore();
//export {app, auth, database}

