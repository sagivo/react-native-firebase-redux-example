import db from './../models/db';

export const types = {
  CREATE_USER: 'CREATE_USER',
  ON_USER_DATA: 'ON_USER_DATA',
  REFRESHING_USER: 'REFRESHING_USER',
  UPDATE_USER: 'UPDATE_USER',
  LOGOUT: 'LOGOUT',
};

export function createUser(userId, userData, cb) {
  return dispatch => {
    db.ref(`users/${userId}`).update(userData).then(cb)
    .catch(e => console.error(e));
  }
}

export function syncUser(userId) {
  return (dispatch, getState) => {
    dispatch({ type: types.REFRESHING_USER });

    db.ref(`users/${userId}`).on('value', (s) => {
      dispatch(onUserData(s.val()));
    });
  }
}

export function onUserData(data) {
  return {
    type: types.ON_USER_DATA,
    payload: data,
  };
}

export function updateUser(key, value) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    if (getState().UserReducer[key] !== value)
      db.ref(`users/${userId}`).child(key).set(value).catch(dbError);
  }
}

export function updateToken(token) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    // TODEO: RESTORE
    // db.ref(`tokens/${userId}`).set(token).catch(dbError);
  }
}

export function unSyncUser() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    db.ref(`users/${userId}`).off('value');
  }
}

export function logout() {
  return { type: types.LOGOUT };
}

function dbError(error) {
  console.error('DB ERROR', error);
}