import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAtcbb46kPSYX2CGa2R_gCymskkGgKStac',
  authDomain: 'noteworthy-626d8.firebaseapp.com',
  databaseURL: 'https://noteworthy-626d8.firebaseio.com',
  projectId: 'noteworthy-626d8',
  storageBucket: '',
  messagingSenderId: '779825864349',
  clientId: '779825864349-n0v45kgn2p8c790q2nckhh7cbpoku00l.apps.googleusercontent.com'
};

firebase.initializeApp(config);

const ref = firebase.database().ref();
const firebaseAuth = firebase.auth;
const database = firebase.database();
export { ref, firebaseAuth, database };
export default firebase;