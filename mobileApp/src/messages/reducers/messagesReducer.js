export const messagesReducer = (
  state = {user: {}, authMessage: "", token: undefined},
  action
) => {
  switch (action.type) {
    case "MESSAGE_SEND_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authMessage: "logged"
      };
      break;
    case "MESSAGE_SEND_ERROR":
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
