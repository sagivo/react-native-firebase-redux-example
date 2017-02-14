import { TabNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { View, Button, ListView, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    navigationOptions: {
      tabBar: navigation => ({
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="home" size={30} color={tintColor} />
        },
        label: 'Feed',
      }),
      header: { visible: false }
    },
  },
  Compose: {
    screen: ComposeContainer,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="add" size={30} color={tintColor} />
        },
        label: 'New Call',
      },
    },
  },
  Contact: {
    screen: ContactContainer,
    navigationOptions: {
      tabBar: navigation => ({
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="people" size={30} color={tintColor} />
        },
        label: 'Contacts',
      }),
    },
  },
  History: {
    screen: HistoryContainer,
    navigationOptions: {
      tabBar: navigation => ({
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="history" size={30} color={tintColor} />
        },
        label: 'History',
      })
    },
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: {
      tabBar: navigation => ({
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="person" size={30} color={tintColor} />
        },
        label: 'Profile',
      }),
      header: { visible: false },
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
    },
    showLabel: true,
    showIcon: true,
  },
  tabBarPosition: 'bottom',
  // swipeEnabled: true,
  // headerMode: 'float',
  // lazyLoad: true,
});

export default tab;
