import {types} from '../actions/callActions';
import { callStatus, callMethod } from '../models/call';

const initialState = {
  id: null,
  method: null,
  topic: null,
  duration: null,
  start: null,
  end: null,
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
    default:
      return state;
  }
}
