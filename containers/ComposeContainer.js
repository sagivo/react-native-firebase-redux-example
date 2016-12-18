'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Compose from '../components/compose/Compose';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    refreshing: state.feedReducer.refreshing,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
  }, dispatch);
}

class FeedContainer extends Component {
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