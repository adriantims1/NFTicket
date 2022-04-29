import axios from "axios";
import { eachMonthOfInterval } from "date-fns";

//types
import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
  UPLOAD_EVENT,
  UPLOAD_EVENT_FAIL,
  UPLOAD_EVENT_SUCCESS,
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
  streetAddress
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
      console.log(data.data);
      dispatch({
        type: UPLOAD_EVENT_SUCCESS,
        payload: {
          allEvent: [...allEvent, data.data],
        },
      });
    } catch (err) {
      console.log("reducer", err);
      dispatch({
        type: UPLOAD_EVENT_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};

export const modifyEvent = () => {};
