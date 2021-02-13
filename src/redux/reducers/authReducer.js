/** @format */

const initState = { authError: null };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("SIGNOUT SUCCESS");
      return { ...state };
    case "RESET_PASSWORD":
      return { ...state, authError: action.message };
    case "RESET_PASSWORD_ERROR":
      return { ...state, authError: action.message };

    case "LOGIN_ERROR":
      console.log("Login Error");
      //console.log(action.err.code);
      return { ...state, authError: action.err.code };
    default:
      return state;
  }
};

export default authReducer;
