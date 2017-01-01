import {types} from '../actions/userActions';

export let userId = null;

const initialState = {
  id: null,
  name: 'Sagiv Ofek',
  email: null,
  gender: null,
  fb: null,
  location: null,
  languages: null,
  refreshing: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ON_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case types.USER_UPDATED:
      return {
        ...state,
      }
    case types.LOGOUT:
      return {
        ...state,
        id: null,
      }
    default:
      return state;
  }
}

export function getUserId() {
  return initialState.id;
}


export function setUserId(userId) {
  initialState.id  = userId;
}
