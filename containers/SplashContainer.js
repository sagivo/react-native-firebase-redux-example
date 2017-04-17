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
  componentWillMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
          console.log('we got a user', user); //firebase.auth().currentUser
          this.props.onUserData({ id: user.uid })
          this.props.syncUser(user.uid);
          this.redirectWithNewStateTo('Tabs');
      } else {
        console.log('user is out');
        if (user && user.isAnonymous) this.redirectWithNewStateTo('Login');
        else firebase.auth().signInAnonymously()
          .then(this.redirectWithNewStateTo('Login'))
          .catch(err => console.error(err));
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
