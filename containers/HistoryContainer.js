'use strict';

import React, {Component} from 'react';
import { View, Button, ListView } from 'react-native'
import {bindActionCreators} from 'redux';
import HistoryList from '../components/history/HistoryList';
import Loading from '../components/shared/Loading';
import * as historyActions from '../actions/historyActions';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <MaterialIcons name="history" size={30} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.syncHistory();
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
