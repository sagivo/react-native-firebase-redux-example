'use strict';

import React, {Component} from 'react';
import { TextInput, View, StyleSheet } from 'react-native'
import Tags from './Tags';

export default class Compose extends Component {
  constructor(props) {
    super(props);
  }

  onChangeText(text) {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.text}
            placeholder="What do you want to talk about?"
            onChangeText={this.onChangeText}
            multiline={true}
            maxLength={100}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.tags}>
          <Tags />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    // flex: 1,
  },
  text: {
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 30,
    borderWidth: 0,
    height: 210,
    // backgroundColor: 'yellow',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  tags: {
    flex: 1,
    // backgroundColor: 'black'
  }
});