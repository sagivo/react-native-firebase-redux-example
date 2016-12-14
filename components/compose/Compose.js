'use strict';

import React, {Component} from 'react';
import { TextInput, View, StyleSheet } from 'react-native'
import Tags from './Tags';

export default class Feed extends Component {
  constructor(props) {
    super(props);
  }

  onChangeText(text) {
    console.log(text);
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={styles.input}
          placeholder="What do you want to talk about?"
          onChangeText={this.onChangeText}
          multiline={true}
          maxLength={100}
          underlineColorAndroid="transparent"
        />
        <Tags />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 60,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 30,
    borderWidth: 0,
    height: 210,
    // backgroundColor: 'yellow',
    alignItems: 'stretch',
    justifyContent: 'center',
    // flex: 1,
  },
});