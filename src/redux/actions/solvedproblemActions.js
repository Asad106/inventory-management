/** @format */

//CART ACTIONS

export const getSolvedProblems = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("solvedproblems")
        .orderBy("solutiondate")
        // .startAt(0)
        // .limit(5)
        .get()
        .then((querySnapshot) => {
          let solvedproblems = [];
          querySnapshot.forEach((doc) => {
            solvedproblems.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "GET_SOLVEDPROBLEMS", data: solvedproblems });
          console.log("solvedproblems are", solvedproblems);
         
        });
    };
  };
  export const getSolvedProblemCount = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("solvedproblems")
        // .startAt(0)
         .limit(250)
        .get()
        .then((querySnapshot) => {
         let solvedproblemcount=0;
         solvedproblemcount=querySnapshot.size;
          dispatch({ type: "GET_SOLVEDPROBLEMCOUNT", data: solvedproblemcount });
          console.log("solvedproblemcount is", solvedproblemcount);
         
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
  
  