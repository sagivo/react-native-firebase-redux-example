import db from './../models/db';

export const types = {
  REFRESHING_HISTORY: 'REFRESHING_HISTORY',
  REMOVE_HISTORY: 'REMOVE_HISTORY',
  ADD_HISTORY: 'ADD_HISTORY',
  ON_HISTORY_DATA: 'ON_HISTORY_DATA',
};


export function onHistory(data) {
  return {
    type: types.ON_HISTORY_DATA,
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
  return dispatch => {
    dispatch({ type: types.REFRESHING_HISTORY });
    dispatch(onHistory(calls));

    // db.ref(`history/${userId}`).on('value', (s) => {
    //   const consts = {};
    //   s.forEach(v => {
    //     consts[v.key] = v.val();
    //   });
    //   dispatch(onHistory(consts));
    // });
  }
}

const calls = {
  1: {method: 'in', post: 'will talk about everyhing', timestamp: '12m', userId: 31, callId: 5},
  2: {method: 'in', post: 'whos up to talk about soccer?', timestamp: '12m', userId: 512, callId: 51, user: {name: 'Eyal Berkovich', pic: "https://randomuser.me/api/portraits/men/6.jpg"}},
  3: {method: 'in', post: 'what is the meaning of life?', timestamp: '12m', userId: 12, callId: 51},
  4: {method: 'out', post: 'i feel blie', timestamp: '12m', userId: 412, callId: 151},
  5: {method: 'out', post: 'TV is so boring lately. they think that if we will go to reality show we will make it!', timestamp: '12m', userId: 5512, callId: 5341, user: {name: 'Amirah Hecht', pic: "https://randomuser.me/api/portraits/men/2.jpg"}},
  6: {method: 'in', timestamp: '1w', userId: 652, callId: 53441, user: {name: 'Eli Umariano', pic: "https://randomuser.me/api/portraits/men/3.jpg"}},
}