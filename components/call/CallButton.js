import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CallButton extends Component {

  constructor(props) {
    super(props);
  }

  renderAnswer() {
    return (
      <View style={styles.actionContainer}>
        <TouchableHighlight onPress={this.props.onPress} style={[styles.round, styles.answer]}>
          <MaterialIcons name="call" style={styles.action} />
        </TouchableHighlight>
      </View>
    );
  }

  renderHang() {
    return (
      <View style={styles.actionContainer}>
        <TouchableHighlight onPress={this.props.onPress} style={[styles.round, styles.hang]}>
          <MaterialIcons name="call-end" style={styles.action} />
        </TouchableHighlight>
      </View>
    );
  }

  renderSpeaker() {
    const on = this.props.on;
    return (
      <View style={styles.actionContainer}>
        <TouchableHighlight onPress={this.props.onPress} style={[styles.round, on ? styles.on : styles.transparent]}>
          <MaterialIcons name='volume-up' style={[styles.action, on ? null : styles.transparentIcon]} />
        </TouchableHighlight>
      </View>
    );
  }

  renderMute() {
    const on = this.props.on;
    return (
      <View style={styles.actionContainer}>
        <TouchableHighlight onPress={this.props.onPress} style={[styles.round, on ? styles.on : styles.transparent]}>
          <MaterialIcons name={on ? 'mic-off' : 'mic'} style={[styles.action, on ? null : styles.transparentIcon]} />
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    switch (this.props.type) {
      case 'mute': return this.renderMute();
      case 'speaker': return this.renderSpeaker();
      case 'hang': return this.renderHang();
      case 'answer': return this.renderAnswer();
    }
  }
}

const styles = StyleSheet.create({
  actionContainer:{
    flex: 1,
    alignItems: 'center',
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