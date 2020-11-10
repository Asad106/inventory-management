/** @format */

const initState = { cartlist: [], cartObj: {} };

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CARTS":
      //console.log(action.err.code);
      return { ...state, cartlist: action.data };
    case "CART_DATE":
      return { ...state, cartlist: action.data };
    case "FILTER_CART":
      return { ...state, cartlist: action.data };
    case "REFRESH":
      return {
        ...state,
        cartlist: [],
        cartObj: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
