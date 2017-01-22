import {types} from '../actions/matchActions';
const initialState = {
  hasMatch: false,
  matches: [],
  // id: null,
  // userId: null,
  // pic: null,
  // name: null,
};

export default function MatchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ON_MATCH:
      return {
        ... state,
        hasMatch: true,
        matches: action.payload,
      };
    case types.DONE_MATCH:
      return initialState;
    default:
      return state;
  }
}

