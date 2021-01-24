export const authReducer = (state = {user: {}, authMessage: ""}, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {...state, user: action.payload, authMessage: "logged"};
      break;
    default:
      return state;
  }
};
