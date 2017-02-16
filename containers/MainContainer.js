import React, {Component} from 'react';
import { Provider, connect } from 'react-redux';
import { AppState, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { syncUser, unSyncUser, updateToken } from '../actions/userActions';
import { setMainNav } from '../actions/navigationActions';
import { remoteEnd } from '../actions/callActions';
import Node from './FeedContainer';
import store from '../models/store'
import Notification from '../models/Notification'
import MainNavigator from '../components/navigation/MainNavigator';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { addNavigationHelpers } from 'react-navigation';

function mapStateToProps(state) {
  return {
    // navState: state.NavigationReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncUser: syncUser,
    updateToken: updateToken,
    remoteEnd: remoteEnd,
    setMainNav: setMainNav,
  }, dispatch);
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.syncUser();
    this.syncNotifications();

    setTimeout(() => {
      // this.navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName: 'Compose2' });
    }, 2000)
  }

  componentDidMount() {
    this.props.setMainNav(this.navigator);
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
      // console.log('token', token);
      this.props.updateToken(token);
    });

    FCM.getInitialNotification().then(handleNotification.bind(this));
    FCM.removeAllDeliveredNotifications();
    this.notificationListener = FCM.on(FCMEvent.Notification, handleNotification.bind(this));

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      this.props.updateToken(token)
    });
  }

  unSyncNotifications() {
    console.log('unSyncNotifications');
    this.refreshTokenListener.remove();
    // this.notificationListener.remove();
  }

  render() {
    return (
      <MainNavigator
        ref={nav => { this.navigator = nav; }}
        // navigation={addNavigationHelpers({
        //   dispatch: this.props.dispatch,
        //   state: this.props.navState,
        // })}
      />
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);

function handleNotification(notif) {
  if (!notif || notif.profile === 0) return;
  console.log('notif ---> ', notif);
  switch (notif.type) {
    case Notification.type.CALL_POST:
      return this.navigator.props.navigation.navigate('Call', { callId: notif.callId });
    case Notification.type.CALL_CANCEL:
    case Notification.type.CALL_END:
      this.props.remoteEnd();
      return this.navigator.props.navigation.navigate('Home');
    default:
      null; //TODO: ADD ERROR OR SOMETHING
  }
}
