import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import authMiddleware from './authMiddleware';

// export default applyMiddleware(thunk)(createStore)(reducers);

// export default compose(applyMiddleware(authMiddleware, thunk))(createStore)(reducers);

export default store = createStore(
  reducers,
  {},
  applyMiddleware(authMiddleware, thunk),
)

async function getCache(key) {
  return await AsyncStorage.getItem(JSON.parse(key));
}

export async function setCache(key, val) {
  return await AsyncStorage.setItem(key, JSON.stringify(val));
}

/* to use
import store from './../models/store'
setTimeout(() => store.dispatch({type: 'ON_DATA', payload: [{id: 1, text: 'foo'}]}), 1000);
setTimeout(() => store.dispatch({type: 'ON_DATA', payload: [{id: 2, text: 'zeo ze'}]}), 2000);
*/
