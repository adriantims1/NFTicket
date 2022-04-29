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

      const balance = await axios.get(
        `https://nfticket-backend.herokuapp.com/api/user/balance/${email}/`
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
          balance: balance.data.Micro_Algos,
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

export const modifyProfile = (
  email,
  firstName,
  lastName,
  avatarURL,
  username,
  is_seller
) => {
  return async (dispatch) => {
    try {
      //Authentication
      dispatch({
        type: MODIFY_PROFILE,
      });
      console.log({
        email,
        first_name: firstName,
        last_name: lastName,
        avtar_url: avatarURL,
        username,
        is_seller: `${is_seller}`,
      });
      await axios.put(
        `https://nfticket-backend.herokuapp.com/api/user/${email}/`,
        {
          email,
          first_name: firstName,
          last_name: lastName,
          avtar_url: avatarURL,
          username,
          is_seller: `${is_seller}`,
        }
      );
      console.log(avatarURL);
      dispatch({
        type: MODIFY_PROFILE_SUCCESS,
        payload: {
          email,
          firstName: firstName,
          lastName: lastName,
          avatarURL: avatarURL,
          username,
          is_seller: `${is_seller}`,
        },
      });
      console.log("success");
    } catch (err) {
      console.log(err.message);
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
