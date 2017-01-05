import db from '../models/db';
import { callStatus, callMethod } from '../models/call';

export const types = {
  ON_CALL: 'ON_CALL',
  HANG: 'HANG',
  ANSWER: 'ANSWER',
  MISSED: 'MISSED',
  SPEAKER: 'SPEAKER',
};


export function onCall(data) {
  // console.log('here', data);
  return {
    type: types.ON_CALL,
    payload: data,
  };
}

export function answer() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = getState().CallReducer.id;
    db.ref(`calls/${userId}`).child(callId).update({
      status: callStatus.START,
      start: new Date().getTime(),
    });
  }
}

export function hang() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = getState().CallReducer.id;
    const startTime = getState().CallReducer.start;
    const endTime = new Date().getTime();

    db.ref(`calls/${userId}`).child(callId).update({
      status: callStatus.END,
      end: endTime,
      duration: endTime - startTime,
    });
  }
}

export function cancel() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const callId = getState().CallReducer.id;
    const { method } = getState().CallReducer;
    db.ref(`calls/${userId}`).child(callId).update({
      status: callStatus.END,
      method: (method === callMethod.IN ? callMethod.IN_MISSED : callMethod.OUT_MISSED),
    });
  }
}

export function missed(call) {
  return {
    type: types.MISSED,
    payload: call,
  };
}


export function syncCalls(userId) {
  return (dispatch, getState) => {
    const startSyncTime = new Date().getTime();
    const userId = getState().UserReducer.id;
    db.ref(`calls/${userId}`).limitToLast(1).on('child_added', newCall => {
      if (newCall.key > startSyncTime){
        db.ref(`calls/${userId}`).child(newCall.key).on('value', s => {
          const call = { ...s.val(), id: s.key };
          dispatch(onCall(call));
        });
      }
    });

    //test data
    db.ref(`calls/sagiv`).remove().then(() => {
      db.ref(`calls/sagiv`).child(new Date().getTime()).set(call1)
      .catch(e => console.error(e));
    })
  }
}

const call1 = {
  method: 'IN',
  topic: null,
  duration: null,
  start: null,
  end: null,
  user: {
    id: 'foo',
    pic: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Sagiv Ofek',
  },
  status: 'CONNECTING',
}

const call2 = {
  method: 'OUT',
  topic: 'I feel blue and need to talk with someone, can anyone listen?',
  duration: null,
  start: null,
  end: null,
  user: {
    id: 'foo',
  },
  status: 'CONNECTING',
}