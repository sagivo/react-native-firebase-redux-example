import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../config';

const Contact = (props) => (
  <TouchableOpacity style={[styles.container, props.selected ? styles.selected : null ]} onLongPress={() => props.onLongPress(props.id)}>
    <View style={styles.left}>
      {props.selected ?
        <Animatable.View animation="flipInY" duration={400}><Icon name="check-circle" size={40} color={COLORS.c1} /></Animatable.View> :
        <Image source={{ uri: props.pic}} style={styles.photo} />}
      <Text style={styles.text}>{props.name}</Text>
    </View>
    <View style={styles.right}>
      { props.online && !props.selected &&
        <Icon name="phone" size={30} color={COLORS.c1} onPress={() => props.onCall(props.id)} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: COLORS.c4,
  },
  right: {
    flex: 1,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.c1,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default Contact;