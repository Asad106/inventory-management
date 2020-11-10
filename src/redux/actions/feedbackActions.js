/** @format */

//CART ACTIONS

export const getFeedBacks = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("Appfeedbacks")
        .orderBy("feedbackdate")
        // .startAt(0)
        // .limit(5)
        .get()
        .then((querySnapshot) => {
          let feedbacks = [];
          querySnapshot.forEach((doc) => {
            feedbacks.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "GET_FEEDBACKS", data: feedbacks });
          console.log("feedbacks are", feedbacks);
         
        });
    };
  };
  export const getFeedBackCount = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("Appfeedbacks")
        // .startAt(0)
         .limit(250)
        .get()
        .then((querySnapshot) => {
         let feedbackcount=0;
         feedbackcount=querySnapshot.size;
          dispatch({ type: "GET_FEEDBACKCOUNT", data: feedbackcount });
          console.log("feedbacks count is", feedbackcount);
         
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
  
  