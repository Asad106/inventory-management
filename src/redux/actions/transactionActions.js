/** @format */
import { isLoading, clearLoader } from "./loadingAction";
//USER ACTIONS

export const getTransactions = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("transactions")
      .orderBy("transaction_date")
      // .startAt(0)
      // .limit(5)
      .get()
      .then((querySnapshot) => {
        let transactions = [];
        querySnapshot.forEach((doc) => {
          transactions.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "GET_TRANSACTIONS", data: transactions });
        dispatch(clearLoader());
        console.log("Transactions are", transactions);
      });
  };
};

export const getTransactionDate = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    // let d = new Date();
    // let cd = d.getMonth() - 1;
    firebase
      .firestore()
      .collection("transactions")
      .orderBy("transaction_date")
      .where(
        "transaction_date",
        ">=",
        new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
      )
      .get()
      .then((querySnapshot) => {
        let transactions = [];
        querySnapshot.forEach((doc) => {
          transactions.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "TRANSACTION_DATE", data: transactions });
        dispatch(clearLoader());
        console.log("transaction are", transactions);
      });
  };
};
export const getFilterTransaction = (start, end) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    // let d = new Date();
    // let cd = d.getMonth() - 1;
    firebase
      .firestore()
      .collection("transactions")
      .orderBy("transaction_date")
      .where("transaction_date", ">=", start)
      .where("transaction_date", "<=", end)
      .get()
      .then((querySnapshot) => {
        let transactions = [];
        querySnapshot.forEach((doc) => {
          transactions.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "TRANSACTION_FILTER_BY_DATE", data: transactions });
        dispatch(clearLoader());
        console.log("transaction are", transactions);
      });
  };
};
export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
