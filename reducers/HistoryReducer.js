import {types} from '../actions/historyActions';
const initialState = {
  calls: [],
  refreshing: false,
  selectedHistory: new Set(),
};

export default function HistoryReducer(state = initialState, action = {}) {
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
    case types.TOGGLE_SELECTED_HISTORY:
      const selectedHistory = new Set(state.selectedHistory);
      const id = action.payload;

      if (selectedHistory.has(id)) selectedHistory.delete(id);
      else selectedHistory.add(id);
      return { ...state, selectedHistory }
    default:
      return state;
  }
}

