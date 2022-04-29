import {
  FETCH_TICKET,
  FETCH_TICKET_FAIL,
  FETCH_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
} from "../types/ticket";

const initialState = {
  allTicket: [],
  isFetching: false,
  hasError: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TICKET:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        errorMessage: "",
      };
    case FETCH_TICKET_SUCCESS:
      return {
        ...state,
        allTicket: payload.allTicket,
        isFetching: false,
      };

    case FETCH_TICKET_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: payload.errorMessage,
      };
    case BUY_TICKET_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
