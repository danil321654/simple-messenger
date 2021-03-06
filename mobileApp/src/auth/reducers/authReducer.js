export const authReducer = (
  state = {user: {}, authMessage: "", token: undefined},
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authMessage: "logged"
      };
      break;
    case "LOGIN_ERROR":
      return {
        ...state,
        user: {},
        authMessage: action.payload.error.message,
        token: undefined
      };
      break;

    case "REGISTER_SUCCESS":
      return {...state, authMessage: "registered"};
      break;
    case "REGISTER_ERROR":
      return {...state, authMessage: action.payload.error.message};
      break;
    default:
      return state;
  }
};
