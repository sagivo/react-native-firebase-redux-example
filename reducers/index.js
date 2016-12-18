import { combineReducers } from 'redux'
import FeedReducer from './FeedReducer';
import ContactReducer from './ContactReducer';
import HistoryReducer from './HistoryReducer';

export default combineReducers({
  FeedReducer,
  ContactReducer,
  HistoryReducer,
})
