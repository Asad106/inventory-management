/** @format */
/** @format */

import authReducer from "./authReducer";
// import projectReducer from "./projectReducer";
import { firestoreReducer } from "redux-firestore";
//import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { inventoryReducer } from "./inventoryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
  //   project: projectReducer,
  firestore: firestoreReducer, //to sync data with firestore
  firebase: firebaseReducer, //for sync auth
});

export default rootReducer;
