import {types} from '../actions/contactActions';
const initialState = {
  contacts: {},
  refreshing: false,
};

export default function feedReducer(state = initialState, action = {}) {
    console.log(action);
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
      console.log('got', action.payload);
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      }
    case types.CONTACT_CALL_PRESS:
      console.log('todo: CONTACT_CALL_PRESS', action.payload);
      return state;
    default:
      return state;
  }
}
