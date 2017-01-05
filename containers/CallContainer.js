'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Compose from '../components/compose/Compose';
import * as callActions from '../actions/callActions';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import CallButtons from '../components/call/CallButtons';
import CallInfo from '../components/call/CallInfo';
import { buttonType } from '../models/call';

function mapStateToProps(state) {
  return {
    call: state.CallReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncCalls: callActions.syncCalls,
    answer: callActions.answer,
    hang: callActions.hang,
    cancel: callActions.cancel,
  }, dispatch);
}

class CallContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mute: false,
      speaker: false,
    };

    this.props.syncCalls();

    this.answer = this.answer.bind(this);
    this.hang = this.hang.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  hang() {
    this.props.hang();
  }

  cancel() {
    this.props.cancel();
  }

  answer() {
    this.props.answer();
  }

  render() {
    return (
      <View style={styles.container}>
        <CallInfo {...this.props.call} />
        <CallButtons {...this.props.call}
          onCancel={this.cancel}
          onHang={this.hang}
          onAnswer={this.answer}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, matchDispatchToProps)(CallContainer);
