import * as types from './actionTypes';

export function setIsonomers(isonomers) {
  return {
    type: types.SET_ISONOMERS,
    isonomers
  };
}
