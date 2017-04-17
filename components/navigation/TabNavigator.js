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
  Contact: {
    screen: ContactContainer,
    navigationOptions: {
      tabBar: navigation => ({
        icon: ({ tintColor, focused }) => {
          return <MaterialIcons name="people" size={30} color={tintColor} />
        },
        label: 'Contacts',
      }),
      header: {
        title: 'Contacts',
        right: <DeleteContactsButton />
      }
    },
  },
  Compose: {
    screen: ComposeContainer,
    navigationOptions: {
      tabBar: navigation => {
        if (navigation.state.params && navigation.state.params.connecting) return {
          icon: ({ tintColor, focused }) => {
            return (<Animatable.View animation="tada" duration={3000} iterationCount="infinite">
              <MaterialIcons name="settings-phone" size={30} color={tintColor} />
            </Animatable.View>);
          },
        }
        return {
          icon: ({ tintColor, focused }) => {
            return <MaterialIcons name="add" size={30} color={tintColor} />
          },
        }
      },
      header: (navigation) => {
        if (navigation.state.params && navigation.state.params.connecting) return {
          title: 'Connecting',
          left: <CancelPostButton />
        }
        return {
          title: 'Compose',
          right: <ComposeButton />,
        }
      }
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
      }),
      header: {
        title: 'History',
        right: <DeleteHistoryButton />,
      },
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
    showIcon: true,
    showLabel: false,
  },
  tabBarPosition: 'bottom',
  // swipeEnabled: true,
  // headerMode: 'float',
  lazyLoad: true,
  initialRouteName: 'Contact',
});
