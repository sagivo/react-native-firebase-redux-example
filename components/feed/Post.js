import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import time from '../../models/time';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.styles = this.getStyle(getRandomColor());
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.left}>
          <Text style={this.styles.mainText}>{this.props.text}</Text>
          <Text style={this.styles.time}>{time(this.props.id).fromNow()}</Text>
        </View>
        <View style={this.styles.right}>
          <View style={this.styles.phone}>
            <Icon name="phone" size={40} color="white" onPress={this.props.onCallPress} />
          </View>
          <View style={this.styles.rating}>
            <Text style={this.styles.score}>{this.props.review} </Text>
            <Text><Icon name="star-o" size={10} color="white" /></Text>
          </View>
        </View>
      </View>
    );
  }

  getStyle(bgColor) {
    return StyleSheet.create({
      container: {
        //padding: 40,
        flexDirection: 'row',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
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
        flex: 5,
        padding:20,
      },
      right: {
        paddingRight: 10,
        flex: 1,
        justifyContent: 'space-between',
      },
      phone: {
        alignItems: 'center',
        padding: 10
      },
      rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      score: {
        fontSize: 10,
        color: 'white',
      },
    });
  }
}


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
    '#506C64'
  ]
  return colors[Math.floor(Math.random() * colors.length)];
}
