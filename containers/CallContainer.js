'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
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
    loadCall: callActions.loadCall,
    answer: callActions.answer,
    hang: callActions.hang,
    cancel: callActions.cancel,
    toggleMute: callActions.toggleMute,
    toggleSpeaker: callActions.toggleSpeaker,
    // callPost: callActions.callPost, //TODO: REMOVE
  }, dispatch);
}

class CallContainer extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);

    const webRTCEvents = {
      // onDisconnected: () => this.state.webRTC.end(),
    }

    this.state = {
      webRTC: new WebRTC(webRTCEvents),
      callId: this.props.navigation.state.params.callId,
    };


    this.answer = this.answer.bind(this);
    this.hang = this.hang.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleSpeaker = this.toggleSpeaker.bind(this);
  }

  componentWillMount() {
    this.props.loadCall(this.state.callId);
  }

  componentWillReceiveProps(nextProps) {
    const call = nextProps.call;
    //calling someone
    if (call.status === callStatus.CONNECTING && call.method === callMethod.OUT)
      this.state.webRTC.call(this.props.userId, call.user.id);
    //user toggle speaker
    if (this.props.call.speaker !== nextProps.call.speaker)
      this.state.webRTC.setSpeaker(nextProps.call.speaker);
  }

  toggleMute() {
    this.state.webRTC.toggleMute();
    this.props.toggleMute();
  }

  toggleSpeaker() {
    this.props.toggleSpeaker();
  }

  hang() {
    console.log('hang');
    this.state.webRTC.end();
    this.props.hang(() => this.props.navigation.navigate('Home'));
  }

  cancel() {
    console.log('cancel');
    this.state.webRTC.end();
    this.props.cancel(() => this.props.navigation.navigate('Home'));
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
          toggleSpeaker={this.toggleSpeaker}
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
