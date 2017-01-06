import db from './../models/db';
import { callStatus, callMethod } from '../models/call';

// TODO: REMOVE test data
db.ref(`posts`).remove().then(() => {
  db.ref(`posts/active`).set({
    1483653167902:{ text: 'i feel blue', online: true, review: 4.2, userId: 'foo' },
    1483653168902:{ text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, userId: 'foo' },
    1483653169902:{ text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, userId: 'foo' },
    1483653177902:{ text: 'what do woman want?', online: false, review: 4.4, userId: 'foo' },
    1283653177902:{ text: 'what do woman want?', online: false, review: 4.4, userId: 'foo' },
    1284553177902:{ text: 'what do woman want?', online: false, review: 4.4, userId: 'foo' },
    1483653187902:{ text: 'seams like all man in NYC are assholes', online: false, review: 3.1, userId: 'foo' },
    1183653187202:{ text: 'seams like all man in NYC are assholes', online: false, review: 3.1, userId: 'foo' },
    1483653267902:{ text: 'So what if you like kids?', online: false, review: 3.1, userId: 'foo' },
  })
  .catch(e => console.error(e));
});
db.ref(`calls`).remove();

export const types = {
  CALL_PRESS: 'CALL_PRESS',
  REFRESHING: 'REFRESHING',
  ON_FEED_DATA: 'ON_FEED_DATA',
  ADD_POST: 'ADD_POST',
};


export function onData(data) {
  return {
    type: types.ON_FEED_DATA,
    payload: data,
  };
}

export function callPost(postId) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callTime = new Date().getTime();
    //update post to old call queue
    db.ref('posts/active').child(postId).once('value', s => {
      const postToMove = s.val();
      db.ref('posts/old').child(postId).set(postToMove)
      .then(() => db.ref('posts/active').child(postId).remove())
      .then(() => console.log(postToMove.userId, userId) )
      //create call for the post owner
      .then(() => db.ref(`calls/${postToMove.userId}`).child(callTime).set({
        method: callMethod.IN,
        status: callStatus.CONNECTING,
        topic: postToMove.text,
        user: { id: userId },
        postId,
      }))
      //create a call for the user
      .then(() => db.ref(`calls/${userId}`).child(callTime).set({
        method: callMethod.OUT,
        status: callStatus.CONNECTING,
        topic: postToMove.text,
        user: { id: postToMove.userId },
        postId,
      }))
      .catch(e => console.error(e));
    });
  }
}

export function syncPosts() {
  return dispatch => {
    dispatch({ type: types.REFRESHING });

    db.ref(`posts/active`).orderByKey().limitToLast(20).on('value', (s) => {
      if (!s.val()) return; //TODO: REMOVE THIS LINE
      const posts = [];
      s.forEach(v=> {
        posts.push({...v.val(), id: parseInt(v.key)});
      });
      dispatch(onData(posts.reverse()));
    });
  }
}

