/** @format */

const initState = { orderlist: [], orderObj: {} };

const orderReducers = (state = initState, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      //console.log(action.err.code);
      return { ...state, orderlist: action.data };
    case "GET_TRANSACTION_FOR_ORDER":
      return {...state, orderObj:action.data};
    case "ORDER_DATE":
      return { ...state, orderlist: action.data };
    case "REFRESH":
      return {
        ...state,
        orderlist: [],
        orderObj: {},
      };
    default:
      return state;
  }
};

export default orderReducers;
