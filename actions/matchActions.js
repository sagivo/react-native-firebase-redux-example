import db from '../models/db';
import { callStatus, callMethod } from '../models/call';

export const types = {
  ON_MATCH: 'ON_MATCH',
  DONE_MATCH: 'DONE_MATCH',
  SYNC_MATCHES: 'SYNC_MATCHES',
};


export function onMatch(data) {
  return {
    type: types.ON_MATCH,
    payload: data,
  };
}

export function doneMatch() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;
    db.ref(`matches/${userId}`).remove().then(() => {
      dispatch({ type: types.DONE_MATCH })
    })
    .catch(e => console.error(e));
  }
}

export function syncMatches() {
  return (dispatch, getState) => {
    const userId = getState().UserReducer.id;

// //TODO: REMOVE test data
// db.ref(`matches`).remove().then(() => {
// db.ref(`matches/sagiv`).child(new Date().getTime()).set({userId: 'foo', name: 'Shlomo Bracha', pic: "https://randomuser.me/api/portraits/men/19.jpg"})
// db.ref(`matches/sagiv`).child(new Date().getTime()).set({userId: 'foo', name: 'Tanya Litvinoga2', pic: "https://randomuser.me/api/portraits/women/20.jpg"})
// db.ref(`matches/sagiv`).child(new Date().getTime()).set({userId: 'foo', name: 'Tanya Litvinoga3', pic: "https://randomuser.me/api/portraits/women/2.jpg"})
// .then(() => {

    db.ref(`matches/${userId}`).orderByKey().on('value', s => {
      if (!s.val()) return; //ignore deleted matches
      const matches = Object.keys(s.val()).map(id => { return { ...s.val()[id], id }; });
      dispatch(onMatch(matches));
    })


// //TODO: REMOVE test data
// })
// .catch(e => console.error(e));
// })

  }
}
