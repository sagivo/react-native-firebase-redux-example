import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = (props) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Image source={{ uri: props.pic}} style={styles.photo} />
      <Text style={styles.text}>{props.name}</Text>
    </View>
    <View style={styles.right}>
      { props.online ?
      <Icon name="phone" size={30} color="#ADD67E" /> :
      <Icon name="phone" size={30} color="#7F7B9B" />
      }
    </View>
  </View>
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
  right: {
    flex: 1,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default Contact;