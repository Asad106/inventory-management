/** @format */

export const GetInventory = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("inventory")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        let inventories = [];
        querySnapshot.forEach((doc) => {
          inventories.push(doc.data());
        });
        dispatch({ type: "GET_INVENTORIES", data: inventories });
      });
  };
};
