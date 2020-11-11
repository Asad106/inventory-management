/** @format */

import { clearLoader, isLoading } from "./loadingAction";

//CART ACTIONS

export const getFeedBacks = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(isLoading());
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
        dispatch(clearLoader());
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
        let feedbackcount = 0;
        feedbackcount = querySnapshot.size;
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
