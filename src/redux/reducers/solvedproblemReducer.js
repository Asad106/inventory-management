/** @format */

const initState = { solvedproblemlist: [], solvedproblemObj: {},solvedproblemcount:0 };

const solvedproblemReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SOLVEDPROBLEMS":
      //console.log(action.err.code);
      return { ...state, solvedproblemlist: action.data };
    case "GET_SOLVEDPROBLEMCOUNT":
      //console.log(action.err.code);
      return { ...state, solvedproblemcount: action.data };
    // case "CART_DATE":
    //   return { ...state, cartlist: action.data };
    // case "FILTER_CART":
    //   return { ...state, cartlist: action.data };
    case "REFRESH":
      return {
        ...state,
        solvedproblemlist: [],
        solvedproblemObj: {},
        solvedproblemcount:0
      };
    default:
      return state;
  }
};

export default solvedproblemReducer;
