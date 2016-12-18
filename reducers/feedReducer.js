import {types} from '../actions/feedActions';

const initialState = {
  refreshing: false,
  posts: [
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: '4 minutes ago'},
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: '4 minutes ago'},
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: '4 minutes ago'},
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: '4 minutes ago'},
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: '4 minutes ago'},
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: '4 minutes ago'},
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: '4 minutes ago'},
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: '4 minutes ago'},
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: '4 minutes ago'},
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: '4 minutes ago'},
    {id:1, text: 'i feel blue', online: true, review: 4.2, time: '4 minutes ago'},
    {id:2, text: 'what do woman want?', online: false, review: 4.4, time: '4 minutes ago'},
    {id:3, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1, time: '4 minutes ago'},
    {id:4, text: 'seams like all man in NYC are assholes', online: false, review: 3.1, time: '4 minutes ago'},
    {id:5, text: 'So what if you like kids?', online: false, review: 3.1, time: '4 minutes ago'},
  ],
  newPostTags: new Set(),
};

export default function FeedReducer(state = initialState, action = {}) {
    console.log(action);
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
      console.log('here');
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case types.CALL_PRESS:
      console.log('CALL_PRESS', action.payload);
      return state;
    default:
      return state;
  }
}
