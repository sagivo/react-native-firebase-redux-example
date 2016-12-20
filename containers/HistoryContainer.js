'use strict';

import React, {Component} from 'react';
import { View, Button, ListView } from 'react-native'
import {bindActionCreators} from 'redux';
import HistoryList from '../components/history/HistoryList';
import Loading from '../components/shared/Loading';
import * as historyActions from '../actions/historyActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    refreshing: state.HistoryReducer.refreshing,
    calls: state.HistoryReducer.calls,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncHistory: historyActions.syncHistory,
    removeHistory: historyActions.removeHistory,
  }, dispatch);
}

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.props.syncHistory('sagiv'); //TODO: LOAD USER ID HERE
  }

  render() {
    return (
      (!this.props.refreshing) ?
      <HistoryList
        calls={this.props.calls}
        removeHistory={this.props.removeHistory}
        />
      :
      <Loading />
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
