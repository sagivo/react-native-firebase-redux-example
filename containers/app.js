import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Node from './CallContainer';
import store from './../models/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Node />
      </Provider>
    );
  }
}
