import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';

import CallContainer from '../../containers/CallContainer';
import TabNavigator from './TabNavigator';

export default StackNavigator({
  Tabs: {
    screen: TabNavigator,
  },
  Call: {
    screen: CallContainer,
    navigationOptions: {
      title: 'calls',
    },
  },
}, {
  headerMode: 'screen',
});
