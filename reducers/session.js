import * as ACTIONS from '../constants/actionTypes';

const initialState = {
  user: null,
  engagements: []
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      }
    case ACTIONS.SET_ENGAGEMENTS:
      return {
        ...state,
        engagements: action.payload
      }
    default:
      return state;
  }
}