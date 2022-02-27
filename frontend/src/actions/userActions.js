import axios from "axios";

import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../actionTypes/userActionTypes";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/login`, { email, password }, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: REGISTER_USER_FAIL, payload: err.response.data.message });
  }
};

//LoadUser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
  }
};

// LogoutUser
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data.message });
  }
};

//Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.status === "success" ? true : false,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.message });
  }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/password/update`, passwords, config);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.status === "success" ? true : false,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

// ForgotPassword
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
