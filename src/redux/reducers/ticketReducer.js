import {
  FETCH_TICKET,
  FETCH_TICKET_FAIL,
  FETCH_TICKET_SUCCESS,
  BUY_TICKET,
  BUY_TICKET_FAIL,
  BUY_TICKET_SUCCESS,
  FETCH_ON_SALE_TICKET,
  FETCH_ON_SALE_TICKET_FAIL,
  FETCH_ON_SALE_TICKET_SUCCESS,
} from "../types/ticket";

const initialState = {
  allTicket: [],
  onSaleTicket: [],
  isBuying: false,
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
    case BUY_TICKET:
      return { ...state, isBuying: true, hasError: false, errorMessage: "" };
    case BUY_TICKET_SUCCESS:
      return { ...state, isBuying: false, allTicket: payload.allTicket };

    case BUY_TICKET_FAIL:
      return {
        ...state,
        isBuying: false,
        hasError: true,
        errorMessage: payload.errorMessage,
      };
    case FETCH_ON_SALE_TICKET:
      return {
        ...state,

        isFetching: true,
        hasError: false,
        errorMessage: "",
      };
    case FETCH_ON_SALE_TICKET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        onSaleTicket: payload.onSaleTicket,
      };
    case FETCH_ON_SALE_TICKET_FAIL:
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
