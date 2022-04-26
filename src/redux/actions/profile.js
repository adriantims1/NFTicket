import axios from "axios";
import { auth } from "../../firebase";

//Types
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  MODIFY_PROFILE,
  MODIFY_PROFILE_FAIL,
  MODIFY_PROFILE_SUCCESS,
  UPDATE_PASSWORD,
} from "../types/profile";

export const fetchProfile = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PROFILE });
      const data = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/${email}/`
      );

      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: {
          email,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          isSeller: data.data.is_seller,
          walletAddress: data.data.wallet_addr,
          avatarURL: data.data.avtar_url,
          username: data.data.username,
        },
      });
    } catch (err) {
      console.log("fetch profile error:", err);
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};

export const modifyProfile = (email, firstName, lastName, avatarURL) => {
  return async (dispatch) => {
    try {
      //Authentication
      dispatch({
        type: MODIFY_PROFILE,
      });
      await axios.put(`https://nfticket-backend.herokuapp.com/api/${email}/`, {
        email,
        first_name: firstName,
        last_name: lastName,
        avtar_url: avatarURL,
      });
      dispatch({
        type: MODIFY_PROFILE_SUCCESS,
        payload: {
          email,
          first_name: firstName,
          last_name: lastName,
          avtar_url: avatarURL,
        },
      });
    } catch (err) {
      dispatch({
        type: MODIFY_PROFILE_FAIL,
        payload: {
          errorMessage: err.message,
        },
      });
    }
  };
};

export const modifyPassword = (newPassword) => {
  return async (dispatch) => {
    try {
      await auth.currentUser.updatePassword(newPassword);
    } catch (err) {
      console.log(error);
      dispatch({
        type: MODIFY_PROFILE_FAIL,
        payload: { errorMessage: error.message },
      });
    }
  };
};
