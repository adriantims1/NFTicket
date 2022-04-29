import axios from "axios";

//Redux
import {
  FETCH_TICKET,
  FETCH_TICKET_FAIL,
  FETCH_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
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
      let newTickets = [];
      for (const ticket of data.data) {
        const event = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/event/${ticket.event}/`
        );
        newTickets.push({ ticket, ...event.data });
      }
      dispatch({
        type: FETCH_TICKET_SUCCESS,
        payload: {
          allTicket: newTickets,
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

export const buyTicketFromEventManager = (eventId, buyerEmail) => {
  return async (dispatch) => {
    try {
      await axios.post("https://nfticket-backend.herokuapp.com/api/ticket/", {
        eventId,
        buyer: buyerEmail,
      });
      dispatch(getTicket());
    } catch (err) {
      dispatch({
        type: BUY_TICKET_FAIL,
        payload: {
          errMessage: err.message,
        },
      });
    }
  };
};

export const buyTicketFromSecondaryMarket = (buyerEmail, ticketId) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `https://nfticket-backend.herokuapp.com/api/ticket/${ticketId}/`,
        {
          buyer: buyerEmail,
        }
      );
      dispatch(getTicket());
    } catch (err) {
      dispatch({
        type: BUY_TICKET_FAIL,
        payload: {
          errMessage: err.message,
        },
      });
    }
  };
};

export const modifyOwnTicket = (ticketId, onSale, price) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `https://nfticket-backend.herokuapp.com/api/ticket/${ticketId}/`,
        {
          on_sale: onSale,
          price,
        }
      );
      dispatch(getTicket());
    } catch (err) {
      dispatch({
        type: BUY_TICKET_FAIL,
        payload: {
          errMessage: err.message,
        },
      });
    }
  };
};
