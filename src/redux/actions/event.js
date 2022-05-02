import axios from "axios";

//types
import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
  UPLOAD_EVENT,
  UPLOAD_EVENT_FAIL,
  UPLOAD_EVENT_SUCCESS,
} from "../types/event";

import { MODIFY_BALANCE } from "../types/profile";

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

export const createNewEvent = (
  email,
  city,
  state,
  zipCode,
  date,
  time,
  quantity,
  price,
  title,
  description,
  images,
  streetAddress,
  success
) => {
  return async (dispatch, getState) => {
    try {
      const { allEvent } = getState().event;
      dispatch({
        type: UPLOAD_EVENT,
      });
      const data = await axios.post(
        "https://nfticket-backend.herokuapp.com/api/event/",
        {
          vendor: email,
          ticket_quantity: quantity,
          title,
          description,
          images,
          street_address: streetAddress,
          city,
          state,
          zipcode: zipCode,
          date,
          time,
          event_price: price,
        }
      );
      const balanceData = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/balance/${email}/`
      );

      dispatch({
        type: UPLOAD_EVENT_SUCCESS,
        payload: {
          allEvent: [...allEvent, data.data],
        },
      });
      dispatch(getEvent());
      dispatch({
        type: MODIFY_BALANCE,
        payload: {
          balance: balanceData.data.Micro_Algos,
        },
      });
      success();
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: UPLOAD_EVENT_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};

export const modifyEvent = (
  email,
  city,
  state,
  zipCode,
  date,
  time,
  quantity,
  price,
  title,
  description,
  images,
  streetAddress,
  eventId,
  success
) => {
  return async (dispatch, getEvent) => {
    try {
      dispatch({
        type: UPLOAD_EVENT,
      });
      await axios.put(
        `https://nfticket-backend.herokuapp.com/api/event/${eventId}/`,
        {
          vendor: email,

          title,
          description,
          images,
          street_address: streetAddress,
          city,
          state,
          zipcode: zipCode,
          date,
          time,
          event_price: price,
        }
      );
      const data = await axios.get(
        "https://nfticket-backend.herokuapp.com/api/event/"
      );
      dispatch({
        type: UPLOAD_EVENT_SUCCESS,
        payload: {
          allEvent: data.data,
        },
      });
      success();
    } catch (err) {
      dispatch({
        type: UPLOAD_EVENT_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};
