import {
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_FAIL,
  FETCH_TRANSACTION_SUCCESS,
} from "../types/transaction";

const initialState = {
  allTransaction: [],
  isFetching: false,
  hasError: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TRANSACTION:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        errorMessage: false,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allTransaction: payload.allTransaction,
      };
    case FETCH_TRANSACTION_FAIL:
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
