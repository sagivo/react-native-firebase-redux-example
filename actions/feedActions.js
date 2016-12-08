import db from './../models/db';
const postsDB = db.ref('posts');

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

    postsDB.on('value', (s) => {
      const posts = [];
      s.forEach(v=> {
        posts.push({...v.val(), id: v.key});
      });
      dispatch(onData(posts));
    });
  }
}