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
import WebRTC from '../models/WebRTC';
import { callStatus, callMethod } from '../models/call';

function mapStateToProps(state) {
  return {
    call: state.CallReducer,
    userId: state.UserReducer.id,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncCalls: callActions.syncCalls,
    answer: callActions.answer,
    hang: callActions.hang,
    cancel: callActions.cancel,
    toggleMute: callActions.toggleMute,
  }, dispatch);
}

class CallContainer extends Component {
  constructor(props) {
    super(props);

    const webRTCEvents = {
      onDisconnected: () => console.log('ok know its off'),
    }

    this.state = {
      speaker: false,
      webRTC: new WebRTC(webRTCEvents),
    };

    this.props.syncCalls();

    this.answer = this.answer.bind(this);
    this.hang = this.hang.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    //call status changed
    const call = nextProps.call;
    //calling someone
    if (call.status === callStatus.CONNECTING && call.method === callMethod.OUT)
      this.state.webRTC.call(this.props.userId, call.user.id);
  }

  toggleMute() {
    this.state.webRTC.toggleMute();
    this.props.toggleMute();
  }

  hang() {
    this.props.hang();
    this.state.webRTC.end();
  }

  cancel() {
    this.props.cancel();
  }

  answer() {
    this.props.answer();
    this.state.webRTC.answer(this.props.userId, this.props.call.user.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <CallInfo {...this.props.call} />
        <CallButtons {...this.props.call}
          onCancel={this.cancel}
          onHang={this.hang}
          onAnswer={this.answer}
          toggleMute={this.toggleMute}
          />
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
