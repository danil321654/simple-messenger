import axios from "axios";
import cfg from "../../config.js";
export const register = user => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          user: user,
          token: response.token
        }
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "REGISTER_ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`${cfg.ip}/register`, user);
      console.log(response.data);
      return onSuccess(response);
    } catch (err) {
      return onError(err);
    }
  };
};
