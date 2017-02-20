'use strict';

import React, {Component} from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

export default class Tags extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
        <Animatable.Text iterationCount="infinite" duration={4000} animation="flash" style={styles.info}>Finding you a match, stay tuned...</Animatable.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  info: {
    marginTop: 50,
    fontSize: 14,
  }
});
