import { combineReducers } from 'redux'
import FeedReducer from './FeedReducer';
import ContactReducer from './ContactReducer';
import HistoryReducer from './HistoryReducer';
import UserReducer from './UserReducer';
import CallReducer from './CallReducer';

export default combineReducers({
  FeedReducer,
  ContactReducer,
  HistoryReducer,
  UserReducer,
  CallReducer,
})
