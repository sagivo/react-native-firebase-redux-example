import {types} from '../actions/feedActions';

const initialState = {
  refreshing: false,
  posts: [],
  newPostTags: new Set(),
  newPostText: null,
  newPostColor: null,
  activePost: null,
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
    case types.SET_COMPOSE_TEXT:
      return {
        ...state,
        newPostText: action.payload,
      }
    case types.SET_COMPOSE_COLOR:
      return {
        ...state,
        newPostColor: action.payload,
      }
    case types.POST_ADDED:
      return {
        ...state,
        newPostTags: new Set(),
        newPostText: null,
        newPostColor: null,
        activePost: action.payload,
      }
    case types.POST_CANCELED:
      return {
        ...state,
        newPostTags: new Set(),
        newPostText: null,
        newPostColor: null,
        activePost: null,
      }
    case types.CALL_PRESS:
      return state;
    case types.TOGGLE_TAG:
      const tags = new Set(state.newPostTags);
      const tag = action.payload;

      if (tags.has(tag)) tags.delete(tag);
      else tags.add(tag);
      return { ...state, newPostTags: tags }
    default:
      return state;
  }
}
