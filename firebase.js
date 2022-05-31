// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr2ch_Sjlq_EtUgbnE6knzfc653R8arZw",
    authDomain: "pgn-app-b0ff5.firebaseapp.com",
    projectId: "pgn-app-b0ff5",
    storageBucket: "pgn-app-b0ff5.appspot.com",
    messagingSenderId: "349710931832",
    appId: "1:349710931832:web:8c24efa3ede6ffe782da8d",
    measurementId: "G-QF2Y5SE4DN"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };