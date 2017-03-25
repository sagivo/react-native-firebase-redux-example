'use strict';

import React, {Component} from 'react';
import { View, Button, Text } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fbLogIn } from '../models/auth';
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
    createUser: userActions.createUser,
  }, dispatch);
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    fbLogIn().then(userData => {
      const { id, ...user } = userData
      console.log('returned: ', user);
      this.props.createUser(id, user, () => {
        this.props.navigation.dispatch({
          type: 'Navigation/RESET', index: 0,
          actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Tabs'}],
        });
      });
    });
  }

  render() {
    return (
      <View>
        <Text>LOGIN SCREEN</Text>
        <Button onPress={this.login} title="login" />
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
