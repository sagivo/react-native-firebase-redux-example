import db from './../models/db';

export const types = {
  CALL_PRESS: 'CALL_PRESS',
  REFRESHING: 'REFRESHING',
  ON_DATA: 'ON_DATA',
  ADD_POST: 'ADD_POST',
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

export function addPost(post) {
  return {
    type: types.ADD_POST,
    payload: post
  };
}

export function syncPosts() {
  return dispatch => {
    dispatch({ type: types.REFRESHING });

    db.ref(`posts/active`).orderByKey().limitToLast(20).on('value', (s) => {
      console.log(s.val());
      const posts = [];
      s.forEach(v=> {
        posts.push({...v.val(), id: parseInt(v.key)});
      });
      dispatch(onData(posts.reverse()));
    });
  }
}

// TODO: REMOVE test data
// db.ref(`posts/active`).remove().then(() => {
//   db.ref(`posts/active`).set({
//     1483653167902:{ text: 'i feel blue', online: true, review: 4.2 },
//     1483653168902:{ text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1 },
//     1483653169902:{ text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1 },
//     1483653177902:{ text: 'what do woman want?', online: false, review: 4.4 },
//     1483653187902:{ text: 'seams like all man in NYC are assholes', online: false, review: 3.1 },
//     1483653267902:{ text: 'So what if you like kids?', online: false, review: 3.1 },
//   })
//   .catch(e => console.error(e));
// })