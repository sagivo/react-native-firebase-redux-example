import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import time from '../../models/time';
import { COLORS, FONTS } from '../../styles';

export default class Post extends Component {
  busy() {
    Alert.alert('Oops... to late, the person is already speaking with someone else.');
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <View style={styles.left}>
          <Text style={styles.mainText}>{this.props.text}</Text>
          <Text style={styles.info}>
            <MaterialIcons name="access-time" />{time(this.props.id).fromNow() + '  '} 
            <MaterialIcons name="star-border" />{this.props.rating}
          </Text>
        </View>
        <View style={styles.right}>
          <View style={styles.phone}>
          {
            this.props.busy ?
            <MaterialIcons name="perm-phone-msg" size={30} color={COLORS.C4} onPress={this.busy} />
            :
            <MaterialIcons name="phone" size={30} color="white" onPress={this.props.onCallPress} />
          }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    ...FONTS.H3,
    color: 'white',
  },
  info: {
    ...FONTS.P2,
    marginTop: 20,
    color: 'white',
    alignItems: 'center',
  },
  left: {
    width: 300,
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  phone: {
    padding: 10,
  },
});



function getRandomColor() {
  const colors = [
    '#EFD6D2',
    '#FF8CC6',
    '#DE369D',
    '#6F5E76',
    '#5C6F68',
    '#8AA39B',
    '#95D9C3',
    '#75B8C8',
    '#506C64',
    '#AFF2AD'
  ]
  return colors[Math.floor(Math.random() * colors.length)];
}
