import {types} from '../actions/callActions';
import { callStatus, callMethod } from '../models/call';

const initialState = {
  id: null,
  method: null,
  topic: null,
  duration: null,
  start: null,
  end: null,
  mute: false,
  speaker: false,
  user: {
    id: null,
    pic: null,
    name: null,
  },
  status: null,
  postId: null,
};

export default function callReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ON_CALL:
      return {
        ... state,
        ...action.payload,
      };
    case types.HANG:
      return {
        ...state,
        status: callStatus.END,
        end: action.payload,
      };
    case types.ANSWER:
      return {
        ...state,
        status: callStatus.START,
        start: action.payload,
      };
    case types.CONTACT_CALL_PRESS:
      return state;
    case types.TOGGLE_MUTE:
      return { ...state, mute: !state.mute };
    case types.TOGGLE_SPEAKER:
      return { ...state, speaker: !state.speaker };
    case types.CANCEL_CALL:
    case types.REMOTE_END:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
