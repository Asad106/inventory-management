/** @format */

//USER ACTIONS

export const getUsers = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("users")
      .orderBy("name")
      // .startAt(0)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "GET_USERS", data: users });
      });
  };
};
