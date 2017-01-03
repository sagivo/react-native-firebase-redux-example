import db from './../models/db';

export const types = {
  CONTACT_CALL_PRESS: 'CONTACT_CALL_PRESS',
  REFRESHING_CONTACTS: 'REFRESHING_CONTACTS',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  ON_CONTACTS_DATA: 'ON_CONTACTS_DATA',
  ADD_CONTACT: 'ADD_CONTACT',
};


export function onContacts(data) {
  return {
    type: types.ON_CONTACTS_DATA,
    payload: data,
  };
}

export function onContactCallPress(postId) {
  return {
    type: types.CONTACT_CALL_PRESS,
    payload: postId,
  };
}

export function addContact(post) {
  return {
    type: types.ADD_CONTACT,
    payload: post
  };
}

export function syncContacts(userId) {
  return dispatch => {
    dispatch({ type: types.REFRESHING_CONTACTS });

    db.ref(`contacts/${userId}`).on('value', (s) => {
      const consts = {};
      s.forEach(v => {
        consts[v.key] = v.val();
      });
      dispatch(onContacts(consts));
    });
  }
}