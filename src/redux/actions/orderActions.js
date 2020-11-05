/** @format */

//USER ACTIONS

export const getOrders = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("order")
      .orderBy("card_to_order_date")
      // .startAt(0)
      // .limit(5)
      .get()
      .then((querySnapshot) => {
        let orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "GET_ORDERS", data: orders });
        console.log("Orders are", orders);
        // const a=orders[0].card_to_order_date.seconds*1000;
        // var d=new Date(a)
        // console.log(d.toLocaleString());
      });
  };
};

export const getOrdersDate = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    // let d = new Date();
    // let cd = d.getMonth() - 1;
    firebase
      .firestore()
      .collection("order")
      .orderBy("card_to_order_date")
      .where(
        "card_to_order_date",
        ">=",
        new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
      )
      .get()
      .then((querySnapshot) => {
        let orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "ORDER_DATE", data: orders });
        console.log("Orders are", orders);
      });
  };
};

export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
//   export const addUser = (user, history) => {
//     return (dispatch, getState, { getFirebase }) => {
//       const firebase = getFirebase();
//       firebase
//         .firestore()
//         .collection("users")
//         .add({ ...user })
//         .then((res) => {
//           dispatch({ type: "ADD_USER" });
//           refreshControl();
//           history.push("/user");
//         })
//         .catch((err) => {
//           console.log("error while adding", err);
//         });
//     };
//   };

//   export const getUserById = (id) => {
//     console.log(" Edit USER BY id in action" + id);
//     return (dispatch, getState, { getFirebase }) => {
//       const firebase = getFirebase();
//       firebase
//         .firestore()
//         .collection("users")
//         .doc(id)
//         .get()
//         .then((doc) => {
//           console.log(doc.data());
//           dispatch({ type: "EDIT_USER", data: doc.data() });
//         })
//         .catch((err) => {
//           console.log("error while Editing", err);
//         });
//     };
//   };
//   export const updateUserById = (user, history, id) => {
//     return (dispatch, getState, { getFirebase }) => {
//       const firebase = getFirebase();
//       firebase
//         .firestore()
//         .collection("users")
//         .doc(id)
//         .update({ ...user })
//         .then((res) => {
//           refreshControl();
//           history.push("/user");
//           // getUsers();
//         })
//         .catch((err) => {
//           console.log("error while updating", err);
//         });
//     };
//   };
