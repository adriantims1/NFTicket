import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
  UPLOAD_EVENT,
  UPLOAD_EVENT_FAIL,
  UPLOAD_EVENT_SUCCESS,
} from "../types/event";

const initialState = {
  allEvent: [],
  isUploading: false,
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
    case UPLOAD_EVENT:
      return { ...state, isUploading: true };
    case UPLOAD_EVENT_FAIL:
      return {
        ...state,
        isUploading: false,
        hasError: true,
        errorMessage: payload.errorMessage,
      };
    case UPLOAD_EVENT_SUCCESS:
      return {
        ...state,
        isUploading: false,
        allEvent: payload.allEvent,
      };
    default:
      return state;
  }
};
