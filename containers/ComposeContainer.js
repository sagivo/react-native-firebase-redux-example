'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Compose from '../components/compose/Compose';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';
import { Button } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function mapStateToProps(state) {
  return {
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
  }, dispatch);
}

class FeedContainer extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <MaterialIcons name="add" size={30} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Compose />
    );
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
