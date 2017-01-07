import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import time from '../../models/time';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: getRandomColor(),
    }
  }

  busy() {
    Alert.alert('Oops... to late, the person is already speaking with someone else.');
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <View style={styles.left}>
          <Text style={styles.mainText}>{this.props.text}</Text>
          <Text style={styles.time}>{time(this.props.id).fromNow()}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.phone}>
          {
            this.props.busy ?
            <MaterialIcons name="perm-phone-msg" size={40} color="gray" onPress={this.busy} />
            :
            <MaterialIcons name="phone" size={40} color="white" onPress={this.props.onCallPress} />
          }
          </View>
          <View style={styles.rating}>
            <Text style={styles.score}><MaterialIcons name="star-border" color="white" />{this.props.rating}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: 'white',
    fontSize: 20,
  },
  time: {
    marginTop: 10,
    fontSize: 10,
    color: 'white',
    fontStyle : 'italic',
  },
  left: {
    flex:4,
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  phone: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 100,
    padding: 10,
  },
  rating: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 16,
    color: 'white',
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
