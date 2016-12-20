import {types} from '../actions/contactActions';
const initialState = {
  contacts: {},
  refreshing: false,
};

export default function feedReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REFRESHING_CONTACTS:
      return {
        ... state,
        refreshing: true
      };
    case types.ON_CONTACTS_DATA:
      return {
        ...state,
        refreshing: false,
        contacts: action.payload,
      };
    case types.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      }
    case types.CONTACT_CALL_PRESS:
      return state;
    default:
      return state;
  }
}
