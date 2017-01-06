import {types} from '../actions/feedActions';

const initialState = {
  refreshing: false,
  posts: [
    // {id:1283646676823, text: 'i feel blue', online: true, review: 4.2 },
    // {id:148646827, text: 'what do woman want?', online: false, review: 4.4 },
    // {id:148366676823, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1 },
    // {id:1483646673883, text: 'seams like all man in NYC are assholes', online: false, review: 3.1 },
    // {id:1483646626823, text: 'So what if you like kids?', online: false, review: 3.1 },
    // {id:1483646674823, text: 'i feel blue', online: true, review: 4.2 },
    // {id:1483646675823, text: 'what do woman want?', online: false, review: 4.4 },
    // {id:1483646676823, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1 },
    // {id:1483646677823, text: 'seams like all man in NYC are assholes', online: false, review: 3.1 },
    // {id:1483646678823, text: 'So what if you like kids?', online: false, review: 3.1 },
    // {id:1483646679823, text: 'i feel blue', online: true, review: 4.2 },
    // {id:1483646670823, text: 'what do woman want?', online: false, review: 4.4 },
    // {id:148641671823, text: 'so today was my last day at work. took me way too long to do it', online: false, review: 3.1 },
    // {id:1483642676823, text: 'seams like all man in NYC are assholes', online: false, review: 3.1 },
    // {id:1483643676823, text: 'So what if you like kids?', online: false, review: 3.1 },
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
    case types.ON_FEED_DATA:
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
