/** @format */

export const signIn = (credentails, history) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentails.email, credentails.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        history.push("/");
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
        history.push("/signin");
      })
      .catch((err) => console.log(err));
  };
};
export const resetPassword = (email) => {
  console.log(email);
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
      .catch((err) =>
        dispatch({
          type: "RESET_PASSWORD_ERROR",
          message: "Error while sending code",
        })
      );
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
