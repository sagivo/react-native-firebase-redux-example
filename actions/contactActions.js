import db from './../models/db';

export const types = {
  CONTACT_CALL_PRESS: 'CONTACT_CALL_PRESS',
  TOGGLE_SELECTED_CONTACTS: 'TOGGLE_SELECTED_CONTACTS',
  REFRESHING_CONTACTS: 'REFRESHING_CONTACTS',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  ON_CONTACTS_DATA: 'ON_CONTACTS_DATA',
  ADD_CONTACT: 'ADD_CONTACT',
  CONTACTS_DELETED: 'CONTACTS_DELETED',
};


export function onContacts(data) {
  return {
    type: types.ON_CONTACTS_DATA,
    payload: data,
  };
}

export function deleteContacts() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const {selectedContacts} = getState().ContactReducer;

    selectedContacts.forEach(contactId => db.ref(`contacts/${userId}/${contactId}`).remove());

    dispatch({type: types.CONTACTS_DELETED});
  }
}

export function toggleSelectedContacts(data) {
  return {
    type: types.TOGGLE_SELECTED_CONTACTS,
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

export function syncContacts() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    dispatch({ type: types.REFRESHING_CONTACTS });

    db.ref(`contacts/${userId}`).on('value', (s) => {
      const contacts = [];
      s.forEach(v => {
        contacts.push({ ...v.val(), id: v.key});
      });
      const sorted = contacts.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : (a.name.toLowerCase() === b.name.toLowerCase() ? 0 : -1)));
      console.log(sorted);
      dispatch(onContacts(sorted));
    });
  }
}