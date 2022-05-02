import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  MODIFY_PROFILE,
  MODIFY_PROFILE_SUCCESS,
  MODIFY_PROFILE_FAIL,
  MODIFY_BALANCE,
} from "../types/profile";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  isSeller: false,
  balance: 0,
  username: "",
  avatarURL: "",
  walletAddress: "",
  isFetching: false,
  hasError: false,
  errorMessage: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE:
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        balance: 0,
        isSeller: false,
        walletAddress: "",
        isFetching: true,
        hasError: false,
        errorMessage: "",
        hasModifyError: false,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        isSeller: payload.isSeller,
        walletAddress: payload.walletAddress,
        username: payload.username,
        avatarURL: payload.avatarURL,
        balance: payload.balance,
        isFetching: false,
        hasError: false,
        errorMessage: "",
        hasModifyError: false,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        hasError: true,
        errorMessage: payload.errorMessage,
        hasModifyError: false,
      };
    case MODIFY_PROFILE:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        errorMessage: "",
        hasModifyError: false,
      };
    case MODIFY_PROFILE_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: payload.errorMessage,
        hasModifyError: true,
      };

    case MODIFY_PROFILE_SUCCESS:
      return {
        ...state,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatarURL: payload.avatarURL,
        username: payload.username,

        isFetching: false,
        hasError: false,
        errorMessage: "",
        hasModifyError: "",
      };
    case MODIFY_BALANCE:
      return {
        ...state,
        balance: payload.balance,
      };
    default:
      return state;
  }
};
