export const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case "MESSAGE_SEND_SUCCESS":
      return {
        ...state,
        lastMes: null
      };
      break;
    case "MESSAGE_SEND_ERROR":
      return {
        ...state
      };
      break;
    default:
      return state;
  }
};
