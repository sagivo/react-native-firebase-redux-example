import { TabNavigator,  } from 'react-navigation';
import React, {Component} from 'react';
import { View, Button, ListView, Text } from 'react-native'

import MainContainer from '../../containers/MainContainer';
import ComposeContainer from '../../containers/ComposeContainer';
import FeedContainer from '../../containers/FeedContainer';
import HistoryContainer from '../../containers/HistoryContainer';
import CallContainer from '../../containers/CallContainer';
import ContactContainer from '../../containers/ContactContainer';
import ProfileContainer from '../../containers/ProfileContainer';

const tab = TabNavigator(
{
  Feed: {
    screen: FeedContainer,
    label: 'foooo',
  },
  Compose: {
    screen: ComposeContainer,
  },
  Contact: {
    screen: ContactContainer,
  },
  History: {
    screen: HistoryContainer,
  },
  Profile: {
    screen: ProfileContainer,
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      // color: 'white',
    },
    style: {
      // backgroundColor: '#4c559c',
      // height: 50,
    },
    showLabel: false,
    showIcon: true,
  },
  // lazyLoad: true,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  // tabBarComponent: TabView.TabBarTop
});

export default tab;
