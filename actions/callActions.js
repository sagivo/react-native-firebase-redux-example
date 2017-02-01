import db from '../models/db';
import Notification from '../models/Notification';
import { callStatus, callMethod } from '../models/call';

export const types = {
  ON_CALL: 'ON_CALL',
  CANCEL_CALL: 'CANCEL_CALL',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
  TOGGLE_SPEAKER: 'TOGGLE_SPEAKER',
  HANG: 'HANG',
  ANSWER: 'ANSWER',
  MISSED: 'MISSED',
  SPEAKER: 'SPEAKER',
};


export function onCall(data) {
  return {
    type: types.ON_CALL,
    payload: data,
  };
}

export function answer() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const otherUserId = getState().CallReducer.user.id;
    const callId = getState().CallReducer.id;
    const newParams = {
      status: callStatus.START,
      start: new Date().getTime(),
    };

    db.ref(`calls/${userId}/${callId}`).update(newParams);
    db.ref(`calls/${otherUserId}/${callId}`).update(newParams);
  }
}

export function hang(cb) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const otherUserId = getState().CallReducer.user.id;
    const callId = getState().CallReducer.id;
    const startTime = getState().CallReducer.start;
    const endTime = new Date().getTime();
    const newParams = {
      status: callStatus.END,
      end: endTime,
      duration: endTime - startTime,
    };

    db.ref(`calls/${userId}/${callId}`).update(newParams)
      .then(() => db.ref(`calls/${otherUserId}/${callId}`).update(newParams))
      //notify the other user the call has canceled.
      .then(Notification.sendCallEnd(otherUserId, callId))
      .then(() => cb())
      .then(() => dispatch({ type: types.HANG }))
  }
}

export function cancel(cb) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = getState().CallReducer.id;
    const otherUserId =  getState().CallReducer.user.id;
    const { method, postId } = getState().CallReducer;
    // update current user call
    db.ref(`calls/${userId}/${callId}`).update({
      status: callStatus.END,
      method: (method === callMethod.IN ? callMethod.IN_MISSED : callMethod.OUT_MISSED),
    })
    .then(() => {
      // update other user user call
      db.ref(`calls/${otherUserId}/${callId}`).update({
        status: callStatus.END,
        method: (method === callMethod.IN ? callMethod.OUT_MISSED : callMethod.IN_MISSED),
      });
    })
    .then(() => {
      // put post back in the feed
      db.ref(`posts/old/${postId}`).once('value', s => {
        db.ref(`posts/active/${postId}`).set(s.val())
      })
    })
    .then(() => db.ref('posts/old').child(postId).remove())
    .then(() => console.log('sending'))
    .then(Notification.sendCallCancel(otherUserId, callId))
    .then(() => dispatch({ type: types.CANCEL_CALL }))
    .then(() => cb())
    .catch((err) => console.error(err));
  }
}

export function missed(call) {
  return {
    type: types.MISSED,
    payload: call,
  };
}

export function toggleMute() {
  return { type: types.TOGGLE_MUTE };
}

export function toggleSpeaker() {
  return { type: types.TOGGLE_SPEAKER };
}

export function loadCall(callId) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

    db.ref(`calls/${userId}/${callId}`).on('value', s => {
      const call = { ...s.val(), id: callId };
      dispatch(onCall(call));
    });
  }
}
// export function syncCalls(userId) {
//   return (dispatch, getState) => {
//     const startSyncTime = new Date().getTime();
//     const userId = getState().UserReducer.id;
//     db.ref(`calls/${userId}`).limitToLast(1).on('child_added', newCall => {
//       if (newCall.key > startSyncTime){
//         db.ref(`calls/${userId}/${newCall.key}`).on('value', s => {
//           const call = { ...s.val(), id: s.key };
//           dispatch(onCall(call));
//         });
//       }
//     });

//     //TODO: REMOVE test data
//     db.ref('webrtc').remove();
//     db.ref(`calls`).remove().then(() => {
//       db.ref(`posts/active/101`).remove();
//       callId = 1585316611836;//new Date().getTime(); //TODO GET FFOM PUSH
//       // db.ref(`calls/sagiv/${callId}`).set(outCall).catch(e => console.error(e));
//       // db.ref(`calls/foo/${callId}`).set(inCall).catch(e => console.error(e));
//       db.ref(`posts/old/101`).set({ text: 'go back test.', online: true, rating: 4.2, userId: 'foo', color: '#FF8CC6' })
//         .catch(e => console.error(e));
//     })
//   }
// }

//todo: remove
const inCall = {
  method: 'IN',
  topic: 'I feel blue and need to talk with someone, can anyone listen?',
  duration: null,
  start: null,
  end: null,
  user: {
    id: 'foo',
    // pic: 'https://randomuser.me/api/portraits/men/6.jpg',
    // name: 'Sagiv Ofek',
  },
  postId: 101,
  status: 'CONNECTING',
}

const outCall = {
  method: 'OUT',
  topic: 'I feel blue and need to talk with someone, can anyone listen?',
  duration: null,
  start: null,
  end: null,
  user: {
    id: 'sagiv',
  },
  postId: 101,
  status: 'CONNECTING',
}

// //TODO: REMOVE VVVV
// // TODO: REMOVE test data
const writerId = 'sagiv'
db.ref(`calls`).remove();
db.ref('webrtc').remove();
db.ref(`posts/old`).remove();
db.ref(`posts/active`).set({
  11:{ text: 'L1orem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat faucibus tortor ac volutpat. Aliquam cursus placerat turpis duis.', online: true, rating: 4.2, userId: writerId, color: '#FF8CC6' },
  22:{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sollicitudin orci, quis venenatis lorem. Praesent convallis vitae posuere.', online: false, rating: 3.1, userId: writerId, color: '#6F5E76' },
  33:{ text: 'i feel blue3', online: false, rating: 3.1, userId: writerId, color: '#8AA39B' },
  44:{ text: 'i feel blue4', online: false, rating: 4.4, userId: writerId, color: '#95D9C3' },
  55:{ text: 'L5orem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet nibh porttitor, gravida purus tristique, congue nibh.', online: false, rating: 4.4, userId: writerId, color: '#506C64', busy: true },
  101:{ text: 'I feel blue and need to talk with someone, can anyone listen?', online: false, rating: 4.4, userId: writerId, color: '#EFD6D2' },
})
.catch(e => console.error(e));


// export function callPost(postId) {
//   return (dispatch, getState) => {
//     const userId = getState().UserReducer.id;
//     const callId = new Date().getTime();
//     //update post to old call queue
//     db.ref(`posts/active/${postId}`).once('value', s => {
//       const postToMove = s.val();
//       const otherUserId = postToMove.userId;
//       db.ref(`posts/old/${postId}`).set(postToMove)
//       .then(() => db.ref(`posts/active/${postId}`).remove())
//       //create call for the post owner
//       .then(() => db.ref(`calls/${otherUserId}/${callId}`).set({
//         method: callMethod.IN,
//         status: callStatus.CONNECTING,
//         topic: postToMove.text,
//         user: { id: userId },
//         postId,
//       }))
//       //create a call for the user
//       .then(() => db.ref(`calls/${userId}/${callId}`).set({
//         method: callMethod.OUT,
//         status: callStatus.CONNECTING,
//         topic: postToMove.text,
//         user: { id: postToMove.userId },
//         postId,
//       }))
//       //send notification
//       .then(() => {
//         Notification.sendPostCallReq(otherUserId, callId, postToMove.text);
//       })
//       .catch(e => console.error(e));
//     });
//   }
// }
