/** @format */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYjCiTEI5H3dpw7yOMI0bFGQ3DtTiMhEY",
  authDomain: "fir-guide-8a183.firebaseapp.com",
  databaseURL: "https://fir-guide-8a183.firebaseio.com",
  projectId: "fir-guide-8a183",
  storageBucket: "fir-guide-8a183.appspot.com",
  messagingSenderId: "13608801984",
  appId: "1:13608801984:web:1940b1a26fe39e6cb83f25",
  measurementId: "G-J2EG64C4F9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Just for dugugging purpose
window.firebase = firebase;

//firestore database
export const firestore = firebase.firestore();

// Authentincation
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithEmail = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      localStorage.setItem("email", email);
    })
    .catch((ex) => {
      switch (ex) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
          console.log("invalid username/password");
          break;
        default:
          break;
      }
      console.log(ex);
    });

export default firebase;
