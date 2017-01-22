import db from './../models/db';
import { callStatus, callMethod } from '../models/call';

// // TODO: REMOVE test data
// db.ref(`posts`).remove().then(() => {
//   db.ref(`posts/active`).set({
//     11:{ text: 'L1orem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat faucibus tortor ac volutpat. Aliquam cursus placerat turpis duis.', online: true, rating: 4.2, userId: 'foo', color: '#FF8CC6' },
//     22:{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sollicitudin orci, quis venenatis lorem. Praesent convallis vitae posuere.', online: false, rating: 3.1, userId: 'foo', color: '#6F5E76' },
//     33:{ text: 'i feel blue3', online: false, rating: 3.1, userId: 'foo', color: '#8AA39B' },
//     44:{ text: 'i feel blue4', online: false, rating: 4.4, userId: 'foo', color: '#95D9C3' },
//     55:{ text: 'L5orem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet nibh porttitor, gravida purus tristique, congue nibh.', online: false, rating: 4.4, userId: 'foo', color: '#506C64', busy: true },
//     66:{ text: 'L6orem ipsum dolor sit amet, consectetur adipiscing elit. ', online: false, rating: 4.4, userId: 'foo', color: '#EFD6D2' },
//   })
//   .catch(e => console.error(e));
// });
// db.ref(`calls`).remove();

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
