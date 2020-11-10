/** @format */

//CART ACTIONS

export const getProblems = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("problems")
        .orderBy("problemdate")
        // .startAt(0)
        // .limit(5)
        .get()
        .then((querySnapshot) => {
          let problems = [];
          querySnapshot.forEach((doc) => {
            problems.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "GET_PROBLEMS", data: problems });
          console.log("problems are", problems);
         
        });
    };
  };
  export const getProblemCount = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .firestore()
        .collection("problems")
        // .startAt(0)
         .limit(250)
        .get()
        .then((querySnapshot) => {
         let problemcount=0;
         problemcount=querySnapshot.size;
          dispatch({ type: "GET_PROBLEMCOUNT", data: problemcount });
          console.log("problemcount is", problemcount);
         
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
  
  