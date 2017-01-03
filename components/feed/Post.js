import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s",
    s:  "now",
    m:  "now",
    mm: "%dm",
    h:  "h",
    hh: "%dh",
    d:  "a day",
    dd: "%dd",
    M:  "a month",
    MM: "%dm",
    y:  "a year",
    yy: "%d years"
  }
});


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
          <Text style={this.styles.time}>{moment(this.props.time).fromNow()}</Text>
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
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
