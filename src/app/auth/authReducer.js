import {SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT} from './authConstants'
import Immutable from 'immutable'

const initialState = Immutable.Map({
  authenticated: false,
  pendingResponse: false,
  authUser: {}
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return state.set('pendingResponse', true);
    case SIGN_IN_SUCCESS:
      return state.merge({
        'pendingResponse': false,
        'authenticated': true,
        'authUser': action.user
      });
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer