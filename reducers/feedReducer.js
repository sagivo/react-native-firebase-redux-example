import {types} from '../actions/feedActions';

const initialState = {
  refreshing: false,
  posts: [
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: 1483481830628 },
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: 1483481379200 },
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: 1483481379200 },
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: 1483481379200 },
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: 1483481379200 },
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: 1483481379200 },
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: 1483481379200 },
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: 1483481379200 },
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: 1483481379200 },
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: 1483481379200 },
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: 1483481379200 },
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: 1483481379200 },
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: 1483481379200 },
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: 1483481379200 },
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: 1483481379200 },
  ],
  newPostTags: new Set(),
};

export default function FeedReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REFRESHING:
      return {
        ... state,
        refreshing: true
      };
    case types.ON_DATA:
      return {
        ...state,
        refreshing: false,
        posts: action.payload,
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case types.CALL_PRESS:
      return state;
    default:
      return state;
  }
}
