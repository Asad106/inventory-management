/** @format */

const initialState = { dataList: [], dataObj: {} };

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      return {
        ...state,
        dataList: action.data,
      };
    case "ADD_INVENTORIES":
      return {
        ...state,
        dataObj: action.data,
      };
    case "DELETE_INVENTORIES":
      return {
        ...state,
      };
    case "GET_INVENTORY":
      return {
        ...state,
        dataObj: action.data,
        // dataRefresh: !action.data,
      };
    case "UPDATE_INVENTORY":
      return {
        ...state,
        dataObj: action.data,
      };
    case "REFRESH":
      return {
        ...state,
        dataObj: {},
        dataList: [],
      };

    default:
      return state;
  }
};
