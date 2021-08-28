import * as ACTIONS from '../constants/actionTypes';

const initialState = {
  user: {},
  isAuthenticated: false,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}