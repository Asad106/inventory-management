/** @format */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRyc64HggeuL_BLpef33iwWE5l_Cerse0",
  authDomain: "peerdrop-dev-7aaf9.firebaseapp.com",
  databaseURL: "https://peerdrop-dev-7aaf9.firebaseio.com",
  projectId: "peerdrop-dev-7aaf9",
  storageBucket: "peerdrop-dev-7aaf9.appspot.com",
  messagingSenderId: "818168037247",
  appId: "1:818168037247:web:f59b672ddc0d77ea8fa44a",
  measurementId: "G-ZNBSZPF166",
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
      console.log("user authenticated");
    })
    .catch((ex) => {
      switch (ex.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
          //console.log("invalid username/password");
          document.getElementById("error").innerText =
            "invalid username/password";
          return;
        default:
          break;
      }
      console.log(ex);
    });

export default firebase;
