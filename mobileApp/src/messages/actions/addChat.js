import axios from "axios";
import cfg from "../../config.js";
export const addChat = ({chat, headers}) => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "ADD_CHAT_SUCCESS"
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "ADD_CHAT_ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`${cfg.ip}/chat`, chat, headers);
      console.log(response.data);
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
