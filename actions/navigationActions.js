import db from './../models/db';

export const types = {
  SET_NAV: 'SET_NAV',
};

export function gotoCompose(data) {
  return { type: 'Navigate', routeName: 'Compose' };
}

export function setNav(data) {
  return { type: types.SET_NAV, payload: data };
}

export function doneaMatch() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    db.ref(`matches/${userId}`).remove().then(() => {
      dispatch({ type: types.DONE_MATCH })
    })
    .catch(e => console.error(e));
  }
}