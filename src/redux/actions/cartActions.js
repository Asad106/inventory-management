/** @format */

//CART ACTIONS

export const getCarts = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("carts")
        .orderBy("creation_date_time")
        // .startAt(0)
        // .limit(5)
        .get()
        .then((querySnapshot) => {
          let carts = [];
          querySnapshot.forEach((doc) => {
            carts.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "GET_CARTS", data: carts });
          console.log("Carts are", carts);
         
        });
    };
  };
  export const refreshControl = () => {
    return (dispatch, getState, { getFirebase }) => {
      dispatch({ type: "REFRESH" });
    };
  };
//   export const getTransactionForOrderById = (id) => {
//     console.log(" Transaction details BY id in action" + id);
//     return (dispatch, getState, { getFirebase }) => {
//       const firebase = getFirebase();
//       firebase
//         .firestore()
//         .collection("transactions")
//         .doc(id)
//         .get()
//         .then((doc) => {
//           console.log(doc.data());
//           dispatch({ type: "GET_TRANSACTION_FOR_ORDER", data: doc.data() });
//         })
//         .catch((err) => {
//           console.log("error while fetching tansaction for order", err);
//         });
//     };
//   };
  export const getCartsDate = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      // let d = new Date();
      // let cd = d.getMonth() - 1;
      firebase
        .firestore()
        .collection("carts")
        .orderBy("creation_date_time")
        .where(
          "creation_date_time",
          ">=",
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
        )
        .get()
        .then((querySnapshot) => {
          let carts = [];
          querySnapshot.forEach((doc) => {
            carts.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "CART_DATE", data: carts });
          // console.log("Orders are", orders);
        });
    };
  };
  
  export const getFilterCart = (start, end) => {
    console.log("sataystyasd" + start, "asdhgafhgasf" + end);
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      // let d = new Date();
      // let cd = d.getMonth() - 1;
      firebase
        .firestore()
        .collection("carts")
        .orderBy("creation_date_time")
        .where("creation_date_time", ">=", start)
        .where("creation_date_time", "<=", end)
        .get()
        .then((querySnapshot) => {
          let carts = [];
          querySnapshot.forEach((doc) => {
            carts.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "FILTER_CART", data: carts });
          console.log("Carts are", carts);
        });
    };
  };
  