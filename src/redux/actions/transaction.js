import {
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_FAIL,
  FETCH_TRANSACTION_SUCCESS,
} from "../types/transaction";

import axios from "axios";

export const fetchTransaction = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TRANSACTION,
      });
      let tempData = [];
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/transaction/${email}/`
      );
      for (const transaction of data.data) {
        const { ticket } = transaction;

        const ticketData = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/ticket/${ticket}/`
        );
        const { event } = ticketData.data;

        const eventData = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/event/${event}/`
        );

        tempData.push({
          ...transaction,
          ticket: ticketData.data,
          event: eventData.data,
        });
      }
      dispatch({
        type: FETCH_TRANSACTION_SUCCESS,
        payload: {
          allTransaction: tempData,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_TRANSACTION_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};
