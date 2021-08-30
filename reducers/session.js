import * as ACTIONS from '../constants/actionTypes';

const initialState = {
  user: null,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
}