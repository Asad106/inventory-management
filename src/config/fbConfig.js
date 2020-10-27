/** @format */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
const storage = firebase.storage();

export { storage, firebase as default };
