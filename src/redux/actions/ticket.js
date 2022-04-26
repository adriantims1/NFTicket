import axios from "axios";

//Redux
import {
  FETCH_TICKET,
  FETCH_TICKET_FAIL,
  FETCH_TICKET_SUCCESS,
} from "../types/ticket";

export const getTicket = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TICKET,
      });
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/ticket/${email}/`
      );
      dispatch({
        type: FETCH_TICKET_SUCCESS,
        payload: {
          allTicket: data.data,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_TICKET_FAIL,
        payload: {
          errMessage: err.message,
        },
      });
    }
  };
};
