import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT } from './authConstants';
import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';

const initialState = Immutable.Map({
  isAuthenticated: false,
  isAuthenticating: false,
  authUser: Immutable.Map({}),
  token: null,
});

const authReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {

    case LOG_IN_REQUEST:
      return state.set('isAuthenticating', true);

    case LOG_IN_SUCCESS:
      return state.merge({
        isAuthenticating: false,
        isAuthenticated: true,
        authUser: Immutable.fromJS(jwtDecode(payload.token)),
        token: payload.token,
      });

    case LOG_IN_FAIL:
      return initialState;

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
