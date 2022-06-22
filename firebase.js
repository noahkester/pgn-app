// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/firestore";
// Your web app's firebase configuration
// For firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr2ch_Sjlq_EtUgbnE6knzfc653R8arZw",
  authDomain: "pgn-app-b0ff5.firebaseapp.com",
  projectId: "pgn-app-b0ff5",
  storageBucket: "pgn-app-b0ff5.appspot.com",
  messagingSenderId: "349710931832",
  appId: "1:349710931832:web:8c24efa3ede6ffe782da8d",
  measurementId: "G-QF2Y5SE4DN",
};

// Initialize firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();
const store = firebase.storage();

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("(firebase) Current User: " + user.email);
    if (user.emailVerified) {
      console.log("(firebase) Email (verified)");
    } else {
      console.log("(firebase) Email (not verified)");
    }
  } else {
    console.log("(firebase) No User Logged In");
    documentReadAllowed = false;
  }
});
export function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
export function sendEmail(user) {
  user.sendEmailVerification().then(() => {
    console.log("(firebase) Email send to: " + user.email);
  });
}
export async function getProfilePicture(name) {
  var ref = firebase.storage().ref("/profile-pictures/" + name);
  return new Promise((resolve, reject) => {
    ref.getDownloadURL((url) => {
      resolve(url);
    }, reject);
  });
}
/*
db.collection("users").add({
                    email: user.email,
                })
                    .then((docRef) => {
                        console.log("User document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                    */
export { auth, db, store };
