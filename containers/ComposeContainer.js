'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Compose from '../components/compose/Compose';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';
import { Button } from 'react-native'

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
    title: (navigation, childRouter) => {
      console.log(navigation, childRouter);
      return navigation.state.params.name + "'s Profile!";
    },
  };

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
