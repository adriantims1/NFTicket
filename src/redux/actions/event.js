import axios from "axios";

//types
import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
} from "../types/event";

export const getEvent = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_EVENT,
      });
      const data = await axios.get(
        "https://nfticket-backend.herokuapp.com/api/event/"
      );

      dispatch({
        type: FETCH_EVENT_SUCCESS,
        payload: {
          allEvent: data.data,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_EVENT_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};
