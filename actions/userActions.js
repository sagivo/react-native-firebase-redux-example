import db from './../models/db';

export const types = {
  ON_USER_DATA: 'ON_USER_DATA',
  REFRESHING_USER: 'REFRESHING_USER',
  UPDATE_USER: 'UPDATE_USER',
  LOGOUT: 'LOGOUT',
};


export function onUserData(data) {
  return {
    type: types.ON_USER_DATA,
    payload: data,
  };
}

export function updateUser(key, value) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    db.ref(`users/${userId}`).child(key).set(value).catch(e => console.log('error', e));
  }
}

export function syncUser() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    dispatch({ type: types.REFRESHING_USER });

    db.ref(`users/${userId}`).on('value', (s) => {
      dispatch(onUserData(s.val()));
    });
  }
}

export function logout() {
  return { type: types.LOGOUT };
}