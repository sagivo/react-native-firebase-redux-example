import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { callMethod } from '../../models/call';
import time from '../../models/time';

const CallItem = (props) => (
  <TouchableOpacity style={[styles.container, props.selected ? styles.selected : null ]} onLongPress={() => props.onLongPress(props.id)}>
    <View style={styles.left}>
      {props.selected &&
        <Animatable.View animation="flipInY" duration={400}><Icon name="check-circle" size={40} color="#66a01e" /></Animatable.View>}
    </View>
    <View style={styles.right}>
      { props.online && !props.selected &&
        <Icon name="phone" size={30} color="#ADD67E" onPress={() => props.onCall(props.id)} />}
      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.post}>{props.post}</Text>
        <Text style={styles.timestamp}>{callStatusIcon(props)} {time(props.id).fromNow()}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function callStatusIcon(props) {
  switch (props.method) {
    case callMethod.OUT: return <MaterialIcons name="call-made" />
    case callMethod.OUT_MISSED: return <MaterialIcons name="call-missed-outgoing" />
    case callMethod.IN: return <MaterialIcons name="call-received" />
    case callMethod.IN_MISSED: return <MaterialIcons name="phone-missed" />
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#61fdd0',
  },
  right: {
    flex: 1,
  },
});

export default CallItem;