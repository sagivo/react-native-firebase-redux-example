import db from './../models/db';
import Notification from './../models/Notification';

import { callStatus, callMethod } from '../models/call';

export const types = {
  POST_ADDED: 'POST_ADDED',
  POST_CANCELED: 'POST_CANCELED',
  CALL_PRESS: 'CALL_PRESS',
  TOGGLE_TAG: 'TOGGLE_TAG',
  REFRESHING: 'REFRESHING',
  ON_FEED_DATA: 'ON_FEED_DATA',
  ADD_POST: 'ADD_POST',
  SET_COMPOSE_TEXT: 'SET_COMPOSE_TEXT',
  SET_COMPOSE_COLOR: 'SET_COMPOSE_COLOR',
};


export function onData(data) {
  return {
    type: types.ON_FEED_DATA,
    payload: data,
  };
}

export function setComposeText(data) {
  return {
    type: types.SET_COMPOSE_TEXT,
    payload: data,
  };
}

export function setComposeColor(data) {
  return {
    type: types.SET_COMPOSE_COLOR,
    payload: data,
  };
}

export function callPost(postId, postText, cb) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = new Date().getTime();
    //update post to old call queue
    db.ref(`posts/active/${postId}`).once('value', s => {
      const postToMove = s.val();
      const otherUserId = postToMove.userId;

      db.ref(`posts/old/${postId}`).set(postToMove)
      .then(() => db.ref(`posts/active/${postId}`).remove())
      //create call for the post owner
      .then(() => db.ref(`calls/${otherUserId}/${callId}`).set({
        method: callMethod.IN,
        status: callStatus.CONNECTING,
        topic: postToMove.text,
        user: { id: userId },
        postId,
      }))
      //send notification for post owner about new call
      .then(Notification.sendPostCallReq(otherUserId, callId, postText))
      //create a call for the user
      .then(() => db.ref(`calls/${userId}/${callId}`).set({
        method: callMethod.OUT,
        status: callStatus.CONNECTING,
        topic: postToMove.text,
        user: { id: otherUserId },
        postId,
      }))
      .then(() => cb(callId))
      .catch(e => console.error(e));
    });
  }
}

export function toggleTag(data) {
  return {
    type: types.TOGGLE_TAG,
    payload: data,
  };
}

export function cancelPost(cb) {
  console.log('cancel');
  return (dispatch, getState) => {
    const { postId, ...postToMove } = getState().FeedReducer.activePost;
    //move from active to canceled
    db.ref(`posts/canceled/${postId}`).set(postToMove)
    .then(() => db.ref(`posts/active/${postId}`).remove())
    .then(dispatch({ type: types.POST_CANCELED, payload: { postToMove } }))
    .catch(err => console.error(err));
    if (cb) cb();
  }
}

export function addPost(cb) {
  return (dispatch, getState) => {
    const postId = new Date().getTime();
    const post = {
      userId: getState().UserReducer.id,
      color: getState().FeedReducer.newPostColor,
      text: getState().FeedReducer.newPostText,
      tags: [...getState().FeedReducer.newPostTags],
      location: getState().UserReducer.location,
      rating: getState().UserReducer.rating,
    }
    db.ref(`posts/active/${postId}`).set(post)
      .then(dispatch({ type: types.POST_ADDED, payload: { ...post, postId } }))
      .then(() =>{
        if (cb) cb(true);
      })
      .catch(err => console.error(err));
  }
}

export function syncPosts() {
  return dispatch => {
    dispatch({ type: types.REFRESHING });

    function listFromHash(data) {
      return Object.keys(data).map(id => { return { ...data[id], id: parseInt(id)  } }).reverse();
    }

    db.ref(`posts/active`).orderByKey().limitToLast(4).once('value', (s) => {
      if (!s.val()) return; //TODO: REMOVE THIS LINE
      const data = { ...s.val() };
      let counter = Object.keys(data).length;
      s.forEach(p => {
        p.ref.on('value', newPost => {
          if (counter-- > 0) return; //skip if first load
          if (!newPost.val()) data[p.key].busy = true; //if deleted
          else data[p.key] = { ...data[p.key], ...newPost.val() }; //updated value
          dispatch(onData(listFromHash(data)));
        });
      });
      dispatch(onData(listFromHash(data)));
    });
  }
}
