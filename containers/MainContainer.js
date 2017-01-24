import React, {Component} from 'react';
import { Provider, connect } from 'react-redux';
import { AppState } from 'react-native';
import { bindActionCreators } from 'redux';
import { syncUser, unSyncUser, updateUser } from '../actions/userActions';
import Node from './MatchContainer';
import store from '../models/store'

import FCM from 'react-native-fcm';

import Notification from "../models/Notification";

function mapStateToProps(state) {
  return {
    // languages: state.UserReducer.languages,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncUser,
    updateUser,
  }, dispatch);
}

class Main extends Component {
  componentWillMount() {
    this.props.syncUser();
    this.syncNotifications();
    // AppState.addEventListener('change', state =>
    //   console.log('AppState changed to', state)
    // )
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.unSyncUser();
    this.unSyncNotifications();
  }

  //NOTIFICATIONS
  syncNotifications() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token);
      this.props.updateUser('pushToken', token);
    });

    FCM.getInitialNotification().then(handleNotification);
    FCM.removeAllDeliveredNotifications();
    this.notificationListener = FCM.on('notification', handleNotification);

    this.refreshTokenListener = FCM.on('refreshToken', (token) => {
      console.log('refreshToken', token);
      this.props.updateUser('pushToken', token)
    });
  }

  unSyncNotifications() {
    console.log('unSyncNotifications');
    // this.notificationListener.remove();
    // this.refreshTokenListener.remove();
  }

  render() {
    return (
      <Node />
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);

function handleNotification(notification) {
  if (!notification || notification.profile === 0) return;

  console.log('notification ---> ', notification);
  if(notification.opened_from_tray){
    //app is open/resumed because user clicked banner
  }
}