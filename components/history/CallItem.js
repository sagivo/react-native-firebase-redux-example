import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class CallItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    (this.props.user) ?
    <View style={styles.container}>
      <Image source={{ uri: this.props.user.pic}} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{this.props.user.name}</Text>
        <Text style={styles.post}>{this.props.post}</Text>
        <Text style={styles.timestamp}>
          {this.props.method === 'in' ? <Icon name="chevron-down" /> : <Icon name="chevron-up" /> } {this.props.timestamp}
        </Text>
      </View>
    </View>
    :
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>anonymous </Text>
        <Text style={styles.post}>{this.props.post}</Text>
        <Text style={styles.timestamp}>
          {this.props.method === 'in' ? <Icon name="chevron-down" /> : <Icon name="chevron-up" /> } {this.props.timestamp}
        </Text>
      </View>
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  post: {
  },
});
