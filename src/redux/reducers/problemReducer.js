/** @format */

const initState = { problemlist: [], problemObj: {},problemcount:0 };

const problemReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROBLEMS":
      //console.log(action.err.code);
      return { ...state, problemlist: action.data };
    case "GET_PROBLEMCOUNT":
      //console.log(action.err.code);
      return { ...state, problemcount: action.data };
    // case "CART_DATE":
    //   return { ...state, cartlist: action.data };
    // case "FILTER_CART":
    //   return { ...state, cartlist: action.data };
    case "REFRESH":
      return {
        ...state,
        problemlist: [],
        problemObj: {},
        problemcount:0
      };
    default:
      return state;
  }
};

export default problemReducer;
