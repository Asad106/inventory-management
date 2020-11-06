/** @format */

const initState = { userList: [], userObj: {} };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      //console.log(action.err.code);
      return { ...state, userList: action.data };
    case "ADD_USER":
      //console.log(action.err.code);
      return { ...state, userObj: action.data };
    case "EDIT_USER":
      console.log("edit obj " + JSON.stringify(action.data));
      return { ...state, userObj: action.data };

    case "UPDATE_USER":
      return {
        ...state,
        userObj: action.data,
      };
    case "REFRESH":
      return {
        ...state,
        userList: [],
        userObj: {},
      };
    default:
      return state;
  }
};

export default userReducer;
