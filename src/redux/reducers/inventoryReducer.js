/** @format */

import { toast } from "react-toastify";

const initialState = { data: [] };

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      console.log("Inventories");
      return {
        ...state,
        data: action.data,
      };
    case "ADD_INVENTORIES":
      toast.success("Document Created");
      return {
        ...state,
        data: action.data,
      };
    case "DELETE_INVENTORIES":
      toast.warn("Document deleted");
      return {
        ...state,
      };
    case "EDIT_INVENTORY":
      toast.warn("Edit inventory here");
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};
