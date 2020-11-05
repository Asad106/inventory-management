/** @format */

const initState = { transactionlist: [], transactionObj: {} };

const transactionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return { ...state, transactionlist: action.data };
    case "TRANSACTION_DATE":
      return { ...state, transactionlist: action.data };
    case "REFRESH":
      return {
        ...state,
        transactionlist: [],
        transactionObj: {},
      };
    default:
      return state;
  }
};

export default transactionReducer;
