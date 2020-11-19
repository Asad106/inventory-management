/** @format */

const initState = {
  solvedproblemlist: [],
  solvedproblemObj: {},
  solvedproblemcount: 0,
};

const solvedproblemReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SOLVEDPROBLEMS":
      return { ...state, solvedproblemlist: action.data };
    case "GET_SOLVEDPROBLEMCOUNT":
      return { ...state, solvedproblemcount: action.data };
    case "ADD_PROBLEM_TO_SOLUTION":
      return { ...state, solvedproblemObj: action.data };
    case "REFRESH":
      return {
        ...state,
        solvedproblemlist: [],
        solvedproblemObj: {},
        solvedproblemcount: 0,
      };
    default:
      return state;
  }
};

export default solvedproblemReducer;
