/** @format */

export const signIn = (credentails) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentails.email, credentails.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = (history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
        alert("ho ja out");
        // history.push("/signIn");
      })
      .catch((err) => console.log(err));
  };
};
export const resetPassword = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: "RESET_PASSWORD",
          message: "Email has been sent please verify",
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const getUsers = () => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     firebase
//       .firestore()
//       .collection("User")
//       .orderBy("name")
//       .startAt(0)
//       .limit(50)
//       .get()
//       .then((querySnapshot) => {
//         let users = [];
//         querySnapshot.forEach((doc) => {
//           users.push({ ...doc.data(), id: doc.id });
//         });
//         dispatch({ type: "GET_USERS", data: users });
//       });
//   };
// };
