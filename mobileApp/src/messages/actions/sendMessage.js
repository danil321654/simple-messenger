import axios from "axios";
import cfg from "../../config.js";
export const sendMessage = ({message, headers}) => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "SEND_MESSSAGE_SUCCESS"
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "SEND_MESSSAGE_ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`${cfg.ip}/message`, message, headers);
      console.log(response.data);
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
