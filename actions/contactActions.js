import db from './../models/db';
const contactDB = db.ref('contacts');

export const types = {
  CALL_PRESS: 'CALL_PRESS',
  REFRESHING: 'REFRESHING',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  ON_DATA: 'ON_DATA',
  ADD_CONTACT: 'ADD_CONTACT',
};


export function onData(data) {
  return {
    type: types.ON_DATA,
    payload: data,
  };
}

export function onCallPress(postId) {
  return {
    type: types.CALL_PRESS,
    payload: postId,
  };
}

export function addContact(post) {
  return {
    type: types.ADD_CONTACT,
    payload: post
  };
}

export function syncPosts() {
  return dispatch => {
    dispatch({ type: types.REFRESHING });

    contactDB.on('value', (s) => {
      const posts = [];
      s.forEach(v=> {
        posts.push({...v.val(), id: v.key});
      });
      dispatch(onData(posts));
    });
  }
}