/** @format */

const initState = { feedbacklist: [], feedbackObj: {},feedbackcount:0 };

const feedbackReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_FEEDBACKS":
      //console.log(action.err.code);
      return { ...state, feedbacklist: action.data };
    case "GET_FEEDBACKCOUNT":
      //console.log(action.err.code);
      return { ...state, feedbackcount: action.data };
    // case "CART_DATE":
    //   return { ...state, cartlist: action.data };
    // case "FILTER_CART":
    //   return { ...state, cartlist: action.data };
    case "REFRESH":
      return {
        ...state,
        feedbacklist: [],
        feedbackObj: {},
        feedbackcount:0
      };
    default:
      return state;
  }
};

export default feedbackReducer;
