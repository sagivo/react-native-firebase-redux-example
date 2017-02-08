import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';

import ComposeContainer from '../../containers/ComposeContainer';
import CallContainer from '../../containers/CallContainer';
import TabNavigator from './TabNavigator';

class Home extends Component {
  render() {
    return (
      <TabNavigator />
    );
  }
}

const nav = StackNavigator({
  Home: { screen: Home },
  Compose: { screen: ComposeContainer },
  Call: { screen: CallContainer },
}, {
  // headerMode: 'none',
  // header: {
  //   visible: false,
  // },
});

export default nav;