'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import Compose from '../components/compose/Compose';
import * as callActions from '../actions/callActions';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import CallButton from '../components/call/CallButton';
import CallInfo from '../components/call/CallInfo';

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
    this.toggleSpeaker = this.toggleSpeaker.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  onChangeText(text) {
  }

  hang() {
    this.props.hang();
  }

  answer() {
    this.props.answer();
  }

  toggleSpeaker() {
    this.setState({ ...this.state, speaker: !this.state.speaker });
  }

  toggleMute() {
    this.setState({ ...this.state, mute: !this.state.mute });
  }

  render() {
    return (
      <View style={styles.container}>
        <CallInfo {...this.props.call} />
        <View style={styles.actions}>
          <CallButton type='hang' onPress={this.hang}/>
          <CallButton type='answer' onPress={this.answer} />
        </View>
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
  actions: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  actionContainer:{
    flex: 1,
    alignItems: 'flex-start',
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 30,
  },
  action: {
    backgroundColor: 'transparent',
    fontSize: 30,
    color: 'white',
  },
  hang: {
    backgroundColor: 'red',
  },
  answer: {
    backgroundColor: 'green',
  },
  transparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  transparentIcon: {
    color: 'black',
  },
  
});


export default connect(mapStateToProps, matchDispatchToProps)(CallContainer);
