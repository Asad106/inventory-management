/** @format */

import { clearLoader, isLoading } from "./loadingAction";

//USER ACTIONS

export const getOrders = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
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
        dispatch(clearLoader());
        console.log("Orders are", orders);
      });
  };
};
export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
export const getTransactionForOrderById = (id) => {
  console.log(" Transaction details BY id in action" + id);
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("transactions")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        dispatch({ type: "GET_TRANSACTION_FOR_ORDER", data: doc.data() });
      })
      .catch((err) => {
        console.log("error while fetching tansaction for order", err);
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
        // console.log("Orders are", orders);
      });
  };
};

export const getFilterOrder = (start, end) => {
  console.log("sataystyasd" + start, "asdhgafhgasf" + end);
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    // let d = new Date();
    // let cd = d.getMonth() - 1;
    firebase
      .firestore()
      .collection("order")
      .orderBy("card_to_order_date")
      .where("card_to_order_date", ">=", start)
      .where("card_to_order_date", "<=", end)
      .get()
      .then((querySnapshot) => {
        let orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "FILTER_ORDER", data: orders });
        dispatch(clearLoader());
        console.log("Orders are", orders);
      });
  };
};
