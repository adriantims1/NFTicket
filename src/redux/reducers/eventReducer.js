import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
} from "../types/event";

const initialState = {
  allEvent: [],
  isFetching: false,
  hasError: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EVENT:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        errorMessage: "",
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        allEvent: payload.allEvent,
        isFetching: false,
      };

    case FETCH_EVENT_FAIL:
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
