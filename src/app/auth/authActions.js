import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT } from './authConstants';
import { checkHttpStatus } from '../../utils/index';
import authenticate from '../../services/authService';
import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';

export function logInUserRequest() {
  return {
    type: LOG_IN_REQUEST,
  };
}

export function logInUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOG_IN_SUCCESS,
    payload: { token },
  };
}

export function logInUserFail(err) {
  return {
    type: LOG_IN_FAIL,
    payload: { err },
  };
}

export function logInUser(username, password, history, redirect = '/') {
  return (dispatch) => {
    dispatch(logInUserRequest());

    return authenticate({
      username,
      password,
    })
      .then((resData) => {
        try {
          jwtDecode(resData.token);
          dispatch(logInUserSuccess(resData.token));
          history.pushState(null, redirect);
        } catch (err) {
          console.log(err);
          dispatch(logInUserFail(err));
        }
      })
      .catch((err) => dispatch(logInUserFail(err)));
  };
}

export function logOut(history, redirect='/') {
  history.pushState(null, redirect);
  return {
    type: LOG_OUT,
  };
}
