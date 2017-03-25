import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';

import CallContainer from '../../containers/CallContainer';
import LoginContainer from '../../containers/LoginContainer';
import SplashContainer from '../../containers/SplashContainer';
import LanguageContainer from '../../containers/LanguageContainer';
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
  Language: {
    screen: LanguageContainer,
    navigationOptions: {
      title: 'Select Language',
    },
  },
  Login: {
    screen: LoginContainer,
    navigationOptions: {
      // header: { visible: false },
    },
  },
  Splash: {
    screen: SplashContainer,
    navigationOptions: {
      // header: { visible: false },
    },
  },
}, {
  headerMode: 'screen',
  initialRouteName: 'Splash',
});
