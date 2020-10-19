/** @format */

const initialState = { data: [] };

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      console.log("Success");
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};
