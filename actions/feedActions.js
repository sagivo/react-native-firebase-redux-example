import db from './../models/db';
import Notification from './../models/Notification';

import { callStatus, callMethod } from '../models/call';

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
