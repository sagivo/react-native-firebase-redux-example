import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ContactList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="users" size={40} />
        <Text style={styles.h1}>No Contacts (yet)</Text>
        <Text style={styles.p}>You can get new contacts after having a call and getting a mutual match.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  h1: {
    fontSize: 30,
  },
  p: {
    marginTop: 10,
  }
});