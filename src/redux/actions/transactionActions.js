/** @format */

//USER ACTIONS

export const getTransactions = () => {
  return (dispatch, getState, { getFirebase }) => {
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
        console.log("Transactions are", transactions);
      });
  };
};

export const getTransactionDate = () => {
  return (dispatch, getState, { getFirebase }) => {
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
        console.log("transaction are", transactions);
      });
  };
};

export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
