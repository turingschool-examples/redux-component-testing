import { SIGN_IN, SIGN_OUT } from '../actions/userActions';

const initialState = {
  name: null,
  id: null,
  email: ''
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, action.user);
      break
    case SIGN_OUT:
      return initialState;
      break
    default:
      return state;
      break
  }
};

export default userReducer;