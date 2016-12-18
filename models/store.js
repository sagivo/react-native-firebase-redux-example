import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export default store = createStoreWithMiddleware(reducers);

/* to use
import store from './../models/store'
setTimeout(() => store.dispatch({type: 'ON_DATA', payload: [{id: 1, text: 'foo'}]}), 1000);
setTimeout(() => store.dispatch({type: 'ON_DATA', payload: [{id: 2, text: 'zeo ze'}]}), 2000);
*/