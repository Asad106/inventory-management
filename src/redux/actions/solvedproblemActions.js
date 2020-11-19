/** @format */
import { isLoading, clearLoader } from "./loadingAction";
//CART ACTIONS
export const getSolvedProblems = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("solvedproblems")
      .orderBy("problemdate")
      .get()
      .then((querySnapshot) => {
        let solvedproblems = [];
        querySnapshot.forEach((doc) => {
          solvedproblems.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: "GET_SOLVEDPROBLEMS", data: solvedproblems });
        dispatch(clearLoader());
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
      .limit(250)
      .get()
      .then((querySnapshot) => {
        let solvedproblemcount = 0;
        solvedproblemcount = querySnapshot.size;
        dispatch({ type: "GET_SOLVEDPROBLEMCOUNT", data: solvedproblemcount });
        console.log("solvedproblemcount is", solvedproblemcount);
      });
  };
};
export const addProblemToSolution = (problem) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("solvedproblems")
      .add({ ...problem })
      .then((res) => {
        dispatch({ type: "ADD_PROBLEM_TO_SOLUTION" });
        getSolvedProblems();
        refreshControl();
        dispatch(clearLoader());
      })
      .catch((err) => {
        console.log("error while adding problem to solutions", err);
      });
  };
};
export const refreshControl = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "REFRESH" });
  };
};
