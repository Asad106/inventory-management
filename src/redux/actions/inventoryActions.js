/** @format */

export const GetInventory = (limit, startAt) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    // console.log("LIMIT " + limit);
    // console.log("startAt " + startAt);
    firebase
      .firestore()
      .collection("inventory")
      .orderBy("productName")
      // .startAt(startAt)
      .limit(30)
      .get()
      .then((querySnapshot) => {
        let inventories = [];
        querySnapshot.forEach((doc) => {
          inventories.push({ ...doc.data(), id: doc.id });
        });
        console.log(inventories);
        dispatch({ type: "GET_INVENTORIES", data: inventories });
      });
  };
};

export const addInventory = (inventory, history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .add({ ...inventory })
      .then((res) => {
        history.push("/inventory");
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};

export const DeleteInventory = (id) => {
  console.log("action id" + id);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .delete()
      .then((res) => {
        dispatch({ type: "DELETE_INVENTORY" });
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};
export const getInventoryById = (id) => {
  console.log(" Edit inventory id in action" + id);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .doc(id)
      .get()
      .then((doc) => {
        let inventory = [];
        console.log("Document data:", doc.data());
        inventory.push(JSON.stringify(doc.data()));
        console.log("item tobe edited with id" + inventory);
        dispatch({ type: "EDIT_INVENTORY", data: inventory });
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};
