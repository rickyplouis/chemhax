import * as types from '../actions/actionTypes';

export default function isonomers(state = { isonomers:[] }, action = {}) {
  switch (action.type) {
    case types.SET_ISONOMERS:
      return {
        isonomers: [...state.isonomers, action.isonomers]
      }
    default:
      return state;
  }
}
