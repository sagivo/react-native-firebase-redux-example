'use strict';

import React, {Component} from 'react';
import { View, Button, Text } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginButton, AccessToken, LoginManager, AppEventsLogger } from 'react-native-fbsdk';

function mapStateToProps(state) {
  return {
    refreshing: state.HistoryReducer.refreshing,
    calls: state.HistoryReducer.calls,
    selectedHistory: state.HistoryReducer.selectedHistory,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.getToken();
  }

  getToken() {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log('getCurrentAccessToken => ',data)
      if (!data) this.logIn();
    });
  }

  logIn() {
    LoginManager.logInWithReadPermissions(['public_profile'])
    .then(result => {
      console.log('????',result);
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        console.log('Login success with permissions:', result.grantedPermissions.toString());
        this.getToken();
      }
    }).catch(error => {
      alert('Login fail with error: ' + error);
    });
  }

  logOut() {
    LoginManager.logOut();
    console.log('out');
  }

  render() {
    return (
      <View>
        <Text>aaa</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
