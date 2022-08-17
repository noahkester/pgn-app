// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { Alert } from "react-native";
import { findTimeCategory } from "./time";
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

var allSettled = require('promise.allsettled');

// Initialize firebase
let app = (firebase.apps.length === 0) ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();
const store = firebase.storage();

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
  })
    .catch(() => {
      Alert.alert('Could not send email', '', [
        { text: 'OK' },
      ]);
    });
}
export function sendPasswordReset(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert('Email Sent', 'Check spam folder', [
        { text: 'OK' },
      ]);
    })
    .catch(() => {
      Alert.alert('Enter valid email address', '', [
        { text: 'OK' },
      ]);
    });
}


export async function getProfilePicture(name) {
  console.log('name' + name)
  var ref = firebase.storage().ref("/profile-pictures/" + name);
  return new Promise((resolve, reject) => {
    ref.getDownloadURL((url) => {
      console.log('here');
      resolve(url);
    }, reject);
  });
}

export async function getAllProfilePictures(uid) {
  var promises = [];
  var urls = {
    professionalUrl: '',
    socialUrl: '',
    funnyUrl: ''
  }
  promises.push(
    store
      .ref(`/profile-pictures/${uid}_professional`)
      .getDownloadURL()
      .then((url) => {
        urls.professionalUrl = url
      })
      .catch((e) => {
        console.log("(firebase) Errors while getting professional picture ")
      }))
  promises.push(
    store
      .ref(`/profile-pictures/${uid}_funny`)
      .getDownloadURL()
      .then((url) => {
        urls.socialUrl = url
      })
      .catch((e) => {
        console.log("(firebase) Errors while getting social picture ")
      }))
  promises.push(
    store
      .ref(`/profile-pictures/${uid}_social`)
      .getDownloadURL()
      .then((url) => {
        urls.funnyUrl = url
      })
      .catch((e) => {
        console.log("(firebase) Errors while getting funny picture ")
      }))
  return new Promise((resolve, reject) => {
    allSettled(promises)
      .then(() => {
        resolve(urls);
      })
  });
}



export async function getEvents() {
  var events = {
    todayEvents: [],
    upcomingEvents: [],
    ongoingEvents: [],
    allEvents: []
  }
  return new Promise((resolve, reject) => {
    db.collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          events.allEvents.push(data);

          var timeCategory = findTimeCategory(data.time);
          switch (timeCategory) {
            case -1:
              events.ongoingEvents.push(data);
              break;
            case 0:
              events.todayEvents.push(data);
              break;
            case 1:
              events.upcomingEvents.push(data);
              break;
          }
        });
        resolve(events);
      })
      .catch(e => {
        console.log('(firebase, getEvents) Error ' + e)
        reject(events);
      })
  });
}


export { auth, db, store };
