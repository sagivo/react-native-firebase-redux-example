import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-native'

import * as historyActions from '../../actions/historyActions';

function mapStateToProps(state) {
  return {
    selectedHistory: state.HistoryReducer.selectedHistory,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteHistory: historyActions.deleteHistory,
  }, dispatch);
}


class DeleteHistoryBtn extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Alert.alert(
      'Delete History?',
      'You will not be able to undo this action.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.deleteHistory() },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      this.props.selectedHistory.size ? <Button title='Delete' onPress={this.onPress} /> : null
    );
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(DeleteHistoryBtn)
