import { TabNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { View, Button, ListView, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import MainContainer from '../../containers/MainContainer';
import ComposeContainer from '../../containers/ComposeContainer';
import ComposeButton from '../../containers/buttons/ComposeButton';
import DeleteHistoryButton from '../../containers/buttons/DeleteHistoryButton';
import DeleteContactsButton from '../../containers/buttons/DeleteContactsButton';
import CancelPostButton from '../../containers/buttons/CancelPostButton';
import FeedContainer from '../../containers/FeedContainer';
import HistoryContainer from '../../containers/HistoryContainer';
import CallContainer from '../../containers/CallContainer';
import ContactContainer from '../../containers/ContactContainer';
import ProfileContainer from '../../containers/ProfileContainer';

export default TabNavigator(
{
  Feed: {
    screen: FeedContainer,
    navigationOptions: navigation => ({
      tabBarIcon: ({ tintColor, focused }) => {
        return <MaterialIcons name="home" size={30} color={tintColor} />
      },
      tabBarLabel: 'Feed',
    }),
    header: { visible: false }
  },
  Contact: {
    screen: ContactContainer,
    navigationOptions: navigation => ({
      tabBarIcon: ({ tintColor, focused }) => {
        return <MaterialIcons name="home" size={30} color={tintColor} />
      },
      tabBarLabel: 'Contacts',
    }),
    header: {
      title: 'Contacts',
      right: <DeleteContactsButton />
    },
  },
  Compose: {
    screen: ComposeContainer,
    navigationOptions: navigation => {
      const isConnecting = (navigation.state && navigation.state.params && navigation.state.params.connecting);
      return {
        tabBarIcon: ({ tintColor, focused }) => {
          if (isConnecting) return (
            <Animatable.View animation="tada" duration={3000} iterationCount="infinite">
              <MaterialIcons name="settings-phone" size={30} color={tintColor} />
            </Animatable.View>);
          return <MaterialIcons name="add" size={30} color={tintColor} />
        },
        headerTitle: (isConnecting) ? 'Connecting' : 'Compose',
        headerRight: (isConnecting) ? <CancelPostButton /> : <CancelPostButton />,
      };
    },
  },
  History: {
    screen: HistoryContainer,
    navigationOptions: navigation => ({
      tabBarIcon: ({ tintColor, focused }) => {
        return <MaterialIcons name="history" size={30} color={tintColor} />
      },
      tabBarLabel: 'History',
      headerTitle: 'History',
      headerRight: <DeleteHistoryButton />,
    }),
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: navigation => ({
      tabBarIcon: ({ tintColor, focused }) => {
        return <MaterialIcons name="person" size={30} color={tintColor} />
      },
      tabBarLabel: 'Profile',
      headerVisible: false,
    }),
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
    },
    showIcon: true,
    showLabel: false,
  },
  tabBarPosition: 'bottom',
  // swipeEnabled: true,
  // headerMode: 'float',
  lazyLoad: true,
  initialRouteName: 'Feed',
});
