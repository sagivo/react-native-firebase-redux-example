import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { buttonType } from '../../models/call';
import { callStatus } from '../../models/call';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CallButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mute: false,
      speaker: false,
    }

    this.toggleSpeaker = this.toggleSpeaker.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  toggleSpeaker() {
    this.setState({ ...this.state, speaker: !this.state.speaker });
  }

  toggleMute() {
    this.setState({ ...this.state, mute: !this.state.mute });
  }

  renderConnection() {
    return (
      <View style={styles.actions}>
        <View style={styles.actionContainer}>
          <TouchableHighlight onPress={this.props.onCancel} style={[styles.round, styles.hang]}>
            <MaterialIcons name="call-end" style={styles.action} />
          </TouchableHighlight>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight onPress={this.props.onAnswer} style={[styles.round, styles.answer]}>
            <MaterialIcons name="call" style={styles.action} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderConversation() {
    return (
      <Animatable.View animation="zoomIn" style={styles.actions}>
        <View style={styles.actionContainer}>
          <TouchableHighlight onPress={this.toggleSpeaker} style={[styles.round, this.state.speaker ? styles.on : styles.transparent]}>
            <MaterialIcons name='volume-up' style={[styles.action, this.state.speaker ? null : styles.transparentIcon]} />
          </TouchableHighlight>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight onPress={this.props.onHang} style={[styles.round, styles.hang]}>
            <MaterialIcons name="call-end" style={styles.action} />
          </TouchableHighlight>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight onPress={this.toggleMute} style={[styles.round, this.state.mute ? styles.on : styles.transparent]}>
            <MaterialIcons name={this.state.mute ? 'mic-off' : 'mic'} style={[styles.action, this.state.mute ? null : styles.transparentIcon]} />
          </TouchableHighlight>
        </View>
      </Animatable.View>
    );
  }

  render() {
    switch(this.props.status) {
      case callStatus.CONNECTING: return this.renderConnection();
      case callStatus.START: return this.renderConversation();
      default: return null;
    }
  }
}

const styles = StyleSheet.create({
  actionContainer:{
    flex: 1,
    alignItems: 'center',
  },
  actions: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 50,
  },
  action: {
    fontSize: 30,
    color: 'white',
  },
  hang: {
    backgroundColor: 'red',
  },
  answer: {
    backgroundColor: '#85D230',
  },
  transparent: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  transparentIcon: {
    color: 'black',
  },
  onIcon: {
    color: 'black',
  },
  on: {
    backgroundColor: 'transparent',
    backgroundColor: 'blue',
    borderWidth: 0,
  },
});