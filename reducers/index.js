import { combineReducers } from 'redux'
import feedReducer from './feedReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  feedReducer,
  contactReducer,
})
