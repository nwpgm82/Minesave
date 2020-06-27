import firebase from 'firebase';
// import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCzdT3hWYeKcTN1uKVibC66NZlbWqyHo4E",
    authDomain: "minesave.firebaseapp.com",
    databaseURL: "https://minesave.firebaseio.com",
    projectId: "minesave",
    storageBucket: "minesave.appspot.com",
    messagingSenderId: "188905761434",
    appId: "1:188905761434:web:55c5e959e12d7a171d4d23",
    measurementId: "G-7H1ZR3K1PS"
  }
  firebase.initializeApp(firebaseConfig)
}
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const auth = firebase.auth()
export const db = firebase.firestore()
// export const storageRef = firebase.storage().ref();
// export const imagesRef = storageRef.child('images/');
