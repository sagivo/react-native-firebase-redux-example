import db from './../models/db';

export const types = {
  REFRESHING_HISTORY: 'REFRESHING_HISTORY',
  HISTORY_DELETED: 'HISTORY_DELETED',
  ADD_HISTORY: 'ADD_HISTORY',
  ON_HISTORY_DATA: 'ON_HISTORY_DATA',
  TOGGLE_SELECTED_HISTORY: 'TOGGLE_SELECTED_HISTORY',
};

export function onHistory(data) {
  return {
    type: types.ON_HISTORY_DATA,
    payload: data,
  };
}

export function deleteHistory() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    const {selectedHistory} = getState().HistoryReducer;

    selectedHistory.forEach(callId => db.ref(`calls/${userId}/${callId}`).remove());

    dispatch({type: types.HISTORY_DELETED});
  }
}

export function toggleSelectedHistory(data) {
  return {
    type: types.TOGGLE_SELECTED_HISTORY,
    payload: data,
  };
}

export function addHistory(post) {
  return {
    type: types.ADD_HISTORY,
    payload: post
  };
}

export function syncHistory(userId) {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    db.ref(`calls/${userId}`).on('value', (s) => {
      dispatch(onHistory(s.val()));

      const calls = [];
      s.forEach(v => {
        calls.push({
          ...v.val(),
          id: parseInt(v.key),
        });
      });

      dispatch(onHistory(calls));
    });
    // const calls = [
    //   {id: 1488262460480, method: 'in', post: 'test0 that shouldb be deleted all the time, and its a long text now. home is where your phone is.', timestamp: '15s', userId: 331, callId: 10},
    //   {id: 1488262460380, method: 'out', post: 'test1 that shouldb be deleted all the time', timestamp: '15s', userId: 331, callId: 10, name: 'Tatyana Borichu', pic: 'https://randomuser.me/api/portraits/men/6.jpg'},
    //   {id: 1488272460380, method: 'in_missed', post: 'test2 that shouldb be deleted all the time', timestamp: '15s', userId: 331, callId: 10},
    // ];
    // dispatch(onHistory(calls));
  }
}

// //TODO: REMOVE INIT DATA
// db.ref(`calls/sagiv`).child(1488172460380).set({method: 'in', post: 'test0 that shouldb be deleted all the time, and its a long text now. home is where your phone is.', timestamp: '15s', userId: 331, callId: 10})
// db.ref(`calls/sagiv`).child(1488262460380).set({id: 1488262460380, method: 'out', post: 'test1 that shouldb be deleted all the time', timestamp: '15s', userId: 331, callId: 10, name: 'Tatyana Borichu', pic: 'https://randomuser.me/api/portraits/men/6.jpg'})
// db.ref(`calls/sagiv`).child(1488272460380).set({method: 'in_missed', post: 'test2 that shouldb be deleted all the time', timestamp: '15s', userId: 331, callId: 10})
