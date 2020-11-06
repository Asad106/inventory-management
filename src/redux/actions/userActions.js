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
      // .limit(5)
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
export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
export const addUser = (user, history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("users")
      .add({ ...user })
      .then((res) => {
        dispatch({ type: "ADD_USER" });
        refreshControl();
        history.push("/user");
      })
      .catch((err) => {
        console.log("error while adding", err);
      });
  };
};

export const getUserById = (id) => {
  console.log(" Edit USER BY id in action" + id);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        dispatch({ type: "EDIT_USER", data: doc.data() });
      })
      .catch((err) => {
        console.log("error while Editing", err);
      });
  };
};
export const updateUserById = (user, history, id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ ...user })
      .then((res) => {
        refreshControl();
        history.push("/user");
        // getUsers();
      })
      .catch((err) => {
        console.log("error while updating", err);
      });
  };
};


export const getActiveUsers = () => {
  console.log("in action hy");
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("users")
      // .orderBy("status")
      .where("status", "==", "Active")
      .get()
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "USER_STATUS", data: users });
        // console.log("Users are", users);
      });
  };
};