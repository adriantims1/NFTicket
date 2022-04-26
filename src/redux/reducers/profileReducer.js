import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  MODIFY_PROFILE,
  MODIFY_PROFILE_SUCCESS,
  MODIFY_PROFILE_FAIL,
} from "../types/profile";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  isSeller: false,

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
        firstName: "",
        lastName: "",
        email: "",
        isSeller: false,
        walletAddress: "",
        username: "",
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
        isFetching: false,
        hasError: false,
        errorMessage: "",
        hasModifyError: "",
      };

    default:
      return state;
  }
};
