import {types} from '../actions/contactActions';
const initialState = {
  contacts: {},
  refreshing: false,
  selectedContacts: new Set(),
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
    case types.CONTACTS_DELETED:
      return { ...state, selectedContacts: new Set() }
    case types.TOGGLE_SELECTED_CONTACTS:
      const selectedContacts = new Set(state.selectedContacts);
      const id = action.payload;

      if (selectedContacts.has(id)) selectedContacts.delete(id);
      else selectedContacts.add(id);
      return { ...state, selectedContacts }
    case types.CONTACT_CALL_PRESS:
      return state;
    default:
      return state;
  }
}
