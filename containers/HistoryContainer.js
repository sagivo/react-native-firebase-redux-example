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
    selectedHistory: state.HistoryReducer.selectedHistory,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncHistory: historyActions.syncHistory,
    removeHistory: historyActions.removeHistory,
    toggleSelectedHistory: historyActions.toggleSelectedHistory,
  }, dispatch);
}

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.onLongPress = this.onLongPress.bind(this);
  }

  componentWillMount() {
    this.props.syncHistory();
  }

  onLongPress(id) {
    this.props.toggleSelectedHistory(id);
  }

  render() {
    return (
      (!this.props.refreshing) ?
      <HistoryList
        calls={this.props.calls}
        onCall={this.onCall}
        onLongPress={this.onLongPress}
        selectedHistory={this.props.selectedHistory}
        />
      :
      <Loading />
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
