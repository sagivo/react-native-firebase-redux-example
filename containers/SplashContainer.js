'use strict';

import React, {Component} from 'react';
import { View, Button, Text } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOut } from '../models/auth';
import * as userActions from '../actions/userActions';
import firebase from '../models/firebase';

const USER_STORAGE_KEY = 'user';

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onUserData: userActions.onUserData,
    syncUser: userActions.syncUser,
  }, dispatch);
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.loginWithFirebase();
  }

  loginWithFirebase() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('we got a user', user); //firebase.auth().currentUser
        this.props.onUserData({ id: user.uid })
        this.props.syncUser(user.uid);
        this.redirectWithNewStateTo('Tabs');
      } else {
        console.log('user is out');
        this.redirectWithNewStateTo('Login');
      }
    });
  }

  logout() {
    signOut().then(d => console.log('out!!!', d));
  }

  redirectWithNewStateTo(path){
    this.props.navigation.dispatch({
      type: 'Navigation/RESET', index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName: path}],
    });
  }

  render() {
    return (
      <View>
        <Text>SPLASH SCREEN</Text>
        <Button onPress={this.logout} title="logout" />
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
