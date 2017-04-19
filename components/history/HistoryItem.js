import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { callMethod } from '../../models/call';
import time from '../../models/time';
import { COLORS, FONTS } from '../../styles';

const CallItem = (props) => (
  <TouchableOpacity style={[styles.container, props.selected ? styles.selected : null ]} onLongPress={() => props.onLongPress(props.id)}>
    <View style={styles.left}>
      {props.selected &&
      <Animatable.View animation="flipInY" duration={400} style={styles.check}><Icon name="check-circle" size={40} color={COLORS.C1
      } /></Animatable.View>}
      <View style={styles.innerLeft}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.post}>{props.post}</Text>
        <Text style={styles.info}>{callStatusIcon(props)} {time(props.id).fromNow()}</Text>
      </View>
    </View>
    { props.name && !props.selected &&
    <View style={styles.right}>
      <Icon name="phone" size={30} color={COLORS.C1
      } onPress={() => props.onCall(props.id)} />
    </View>}
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 10,
    justifyContent: 'space-between',
  },
  left: {
    padding: 10,
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLeft: {
  },
  right: {
    padding: 10,
  },
  post: {
    ...FONTS.P1,
    marginTop: 10,
  },
  name: {
    ...FONTS.H3,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 10,
    ...FONTS.P3,
    // fontStyle: 'italic',
  },
  selected: {
    backgroundColor: COLORS.C4
      ,
  },
  check: {
    marginRight: 5,
  },
});

export default CallItem;