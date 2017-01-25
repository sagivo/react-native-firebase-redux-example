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
  }, dispatch);
}

class CallContainer extends Component {
  constructor(props) {
    super(props);

    const webRTCEvents = {
      onDisconnected: () => console.log('ok know its off'),
    }

    this.state = {
      mute: false,
      speaker: false,
      webRTC: new WebRTC(webRTCEvents),
    };

    this.props.syncCalls();

    this.answer = this.answer.bind(this);
    this.hang = this.hang.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //call status changed
    const call = nextProps.call;
    if (call.status === callStatus.CONNECTING) this.state.webRTC.call(this.props.userId, call.user.id);
    // if (call.status === callStatus.START) this.answer(call.start);
    // if (call.status === callStatus.END) this.hang();
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
