/** @format */

const initState = { userList: [], userObj: {} };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      //console.log(action.err.code);
      return { ...state, userList: action.data };
    default:
      return state;
  }
};

export default userReducer;
