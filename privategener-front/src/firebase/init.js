import firebase from 'firebase'

const config ={
    apiKey: "AIzaSyD8udq43MiCxJ4uCtHWIe2LxHVWTHzR6sc",
    authDomain: "privategener.firebaseapp.com",
    projectId: "privategener",
    storageBucket: "privategener.appspot.com",
    messagingSenderId: "963601078649",
    appId: "1:963601078649:web:ee8807d2d9310f95f077a8"
}

firebase.initializeApp(config);
export default firebase;