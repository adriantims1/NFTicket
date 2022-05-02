import axios from "axios";
import { MODIFY_BALANCE } from "../types/profile";

//Redux
import {
  FETCH_TICKET,
  FETCH_TICKET_FAIL,
  FETCH_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
  BUY_TICKET,
  BUY_TICKET_SUCCESS,
  FETCH_ON_SALE_TICKET,
  FETCH_ON_SALE_TICKET_FAIL,
  FETCH_ON_SALE_TICKET_SUCCESS,
} from "../types/ticket";

import { getEvent } from "./event";

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

export const buyTicketFromEventManager = (
  eventId,
  buyerEmail,
  success,
  failure
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: BUY_TICKET,
      });
      await axios.post("https://nfticket-backend.herokuapp.com/api/ticket/", {
        event_id: eventId,
        buyer: buyerEmail,
      });
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/ticket/${buyerEmail}/`
      );

      const balance = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/balance/${buyerEmail}/`
      );

      let newTickets = [];
      for (const ticket of data.data) {
        const event = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/event/${ticket.event}/`
        );
        newTickets.push({ ticket, ...event.data });
      }
      dispatch(getEvent());
      dispatch({
        type: BUY_TICKET_SUCCESS,
        payload: { allTicket: newTickets },
      });
      dispatch({
        type: MODIFY_BALANCE,
        payload: { balance: balance.data.Micro_Algos },
      });
      success();
    } catch (err) {
      dispatch({
        type: BUY_TICKET_FAIL,
        payload: {
          errMessage: err.message,
        },
      });
      failure();
    }
  };
};

export const buyTicketFromSecondaryMarket = (
  buyerEmail,
  ticketId,
  success,
  failure
) => {
  return async (dispatch) => {
    try {
      console.log("buy ticket called");
      dispatch({ type: BUY_TICKET });

      await axios.patch(
        `https://nfticket-backend.herokuapp.com/api/ticket/${ticketId}/`,
        {
          buyer: buyerEmail,
        }
      );
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/ticket/${buyerEmail}/`
      );
      let newTickets = [];
      for (const ticket of data.data) {
        const event = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/event/${ticket.event}/`
        );
        newTickets.push({ ticket, ...event.data });
      }
      const balance = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/balance/${buyerEmail}/`
      );
      dispatch({
        type: BUY_TICKET_SUCCESS,
        payload: { allTicket: newTickets },
      });
      dispatch({
        type: MODIFY_BALANCE,
        payload: { balance: balance.data.Micro_Algos },
      });
      success();
    } catch (err) {
      dispatch({
        type: BUY_TICKET_FAIL,
        payload: {
          errMessage: "Insufficient Funds",
        },
      });
      failure();
    }
  };
};

export const modifyOwnTicket = (
  ticketId,
  onSale,
  price,
  email,
  nft_id,
  is_expired,
  event
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: BUY_TICKET,
      });

      await axios.put(
        `https://nfticket-backend.herokuapp.com/api/ticket/${ticketId}/`,
        {
          on_sale: onSale,
          price,
          nft_id,
          is_expired,
          event,
          owner: email,
        }
      );

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
        type: BUY_TICKET_SUCCESS,
        payload: { allTicket: newTickets },
      });
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

export const getOnSaleTicket = (event_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ON_SALE_TICKET });
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/event/ticket/${event_id}/`
      );

      let newTickets = [];
      for (const ticket of data.data) {
        const event = await axios.get(
          `https://nfticket-backend.herokuapp.com/api/event/${ticket.event}/`
        );
        newTickets.push({ ticket, ...event.data });
      }

      dispatch({
        type: FETCH_ON_SALE_TICKET_SUCCESS,
        payload: { onSaleTicket: newTickets },
      });
    } catch (err) {
      dispatch({
        type: FETCH_ON_SALE_TICKET_FAIL,
        payload: { errorMessage: err.message },
      });
    }
  };
};
