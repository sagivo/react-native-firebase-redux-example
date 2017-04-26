import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import time from '../../models/time';
import { COLORS, FONTS } from '../../styles';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.showScore = this.showScore.bind(this);
    this.showPhone = this.showPhone.bind(this);
  }

  busy() {
    Alert.alert('Oops... to late, the person is already speaking with someone else.');
  }

  showScore(props) {
    if (props.rating) return (
      [<MaterialIcons name="star-border" key={props.id} />, props.rating]
    );
  }

  showPhone() {
    console.log(this.props.currentUserId, this.props.userId);
    if (this.props.currentUserId === this.props.userId) return (
      <Animatable.View animation="tada" duration={3000} iterationCount="infinite">
        <MaterialIcons name="settings-phone" size={30} color="white" />
      </Animatable.View>
    );
    if (this.props.busy) return (
      <MaterialIcons name="perm-phone-msg" size={30} color={COLORS.C4} onPress={this.busy} />
    )
    else return (
      <MaterialIcons name="phone" size={30} color="white" onPress={this.props.onCallPress} />
    );
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <View style={styles.left}>
          <Text style={styles.mainText}>{this.props.text}</Text>
          <Text style={styles.info}>
            {time(this.props.id).fromNow() + '  '}
            { this.showScore(this.props) }
          </Text>
        </View>
        <View style={styles.right}>
          <View style={styles.phone}>
          { this.showPhone() }
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
