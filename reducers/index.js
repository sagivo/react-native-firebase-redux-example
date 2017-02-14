import { combineReducers } from 'redux'
import FeedReducer from './FeedReducer';
import ContactReducer from './ContactReducer';
import HistoryReducer from './HistoryReducer';
import UserReducer from './UserReducer';
import CallReducer from './CallReducer';
import MatchReducer from './MatchReducer';
// import NavigationReducer from './NavigationReducer';

export default combineReducers({
  // NavigationReducer,
  FeedReducer,
  ContactReducer,
  HistoryReducer,
  UserReducer,
  CallReducer,
  MatchReducer,
})
