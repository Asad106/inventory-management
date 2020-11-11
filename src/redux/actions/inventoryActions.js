/** @format */

import { clearLoader, isLoading } from "./loadingAction";

export const getInventories = (limit, startAt) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .orderBy("productName")
      .startAt(startAt)
      .limit(50)
      .get()
      .then((querySnapshot) => {
        let inventories = [];
        querySnapshot.forEach((doc) => {
          inventories.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "GET_INVENTORIES", data: inventories });
        dispatch(clearLoader());
      });
  };
};
// var first = db.collection("cities")
//         .orderBy("population")
//         .limit(25);

// return first.get().then(function (documentSnapshots) {
//   // Get the last visible document
//   var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//   console.log("last", lastVisible);

//   // Construct a new query starting at this document,
//   // get the next 25 cities.
//   var next = db.collection("cities")
//           .orderBy("population")
//           .startAfter(lastVisible)
//           .limit(25);
// });

export const addInventory = (inventory, history) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .add({ ...inventory })
      .then((res) => {
        refreshControl();
        history.push("/inventory");
        dispatch(clearLoader());
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};

export const deleteInventory = (id) => {
  console.log("action id" + id);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .delete()
      .then((res) => {
        dispatch(isLoading());
        getInventories();
        dispatch(clearLoader());
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};
export const getInventoryById = (id) => {
  console.log(" Edit inventory id in action" + id);
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .get()
      .then((doc) => {
        // console.log(doc.data());
        dispatch({ type: "GET_INVENTORY", data: doc.data() });
        dispatch(clearLoader());
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};

export const updateInventoryById = (inventory, history, id) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .update({ ...inventory })
      .then((res) => {
        console.log(res);
        refreshControl();
        history.push("/inventory");
        dispatch(clearLoader());
      })
      .catch((err) => {
        console.log("error while updating", err);
      });
  };
};

export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
