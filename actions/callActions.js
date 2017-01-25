import db from '../models/db';
import { callStatus, callMethod } from '../models/call';

export const types = {
  ON_CALL: 'ON_CALL',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
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

export function hang() {
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

    db.ref(`calls/${userId}/${callId}`).update(newParams);
    db.ref(`calls/${otherUserId}/${callId}`).update(newParams);
  }
}

export function cancel() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = getState().CallReducer.id;
    const otherUserId =  getState().CallReducer.user.id;
    const { method, postId } = getState().CallReducer;
    // update current user call
    db.ref(`calls/${userId}/${callId}`).update({
      status: callStatus.END,
      method: (method === callMethod.IN ? callMethod.IN_MISSED : callMethod.OUT_MISSED),
    });
    // update other user user call
    db.ref(`calls/${otherUserId}/${callId}`).update({
      status: callStatus.END,
      method: (method === callMethod.IN ? callMethod.OUT_MISSED : callMethod.IN_MISSED),
    });
    // put post back in the feed
    db.ref('posts/old').child(postId).once('value', s => {
      const postToMove = s.val();
      db.ref('posts/active').child(postId).set(postToMove)
      .then(() => db.ref('posts/old').child(postId).remove())
    });
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

export function syncCalls(userId) {
  return (dispatch, getState) => {
    const startSyncTime = new Date().getTime();
    const userId = getState().UserReducer.id;
    db.ref(`calls/${userId}`).limitToLast(1).on('child_added', newCall => {
      if (newCall.key > startSyncTime){
        db.ref(`calls/${userId}/${newCall.key}`).on('value', s => {
          const call = { ...s.val(), id: s.key };
          dispatch(onCall(call));
        });
      }
    });

    //TODO: REMOVE test data
    db.ref('webrtc').remove();
    db.ref(`calls`).remove().then(() => {
      db.ref(`posts/active/101`).remove();
      callId = 1585316611836;//new Date().getTime(); //TODO GET FFOM PUSH
      // db.ref(`calls/sagiv/${callId}`).set(outCall).catch(e => console.error(e));
      // db.ref(`calls/foo/${callId}`).set(inCall).catch(e => console.error(e));
      db.ref(`posts/old/101`).set({ text: 'go back test.', online: true, rating: 4.2, userId: 'foo', color: '#FF8CC6' })
        .catch(e => console.error(e));
    })
  }
}

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