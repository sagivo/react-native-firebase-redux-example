import {types} from '../actions/historyActions';
const initialState = {
  calls: {},
  refreshing: false,
};

export default function historyReducer(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case types.REFRESHING_HISTORY:
      return {
        ... state,
        refreshing: true
      };
    case types.ON_HISTORY_DATA:
      return {
        ...state,
        refreshing: false,
        calls: action.payload,
      };
    case types.ADD_HISTORY:
      return {
        ...state,
        calls: [...state.contacts, action.payload],
      }
    default:
      return state;
  }
}
