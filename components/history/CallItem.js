import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default class CallItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <SwipeRow rightOpenValue={-50} key={this.props.id} >
      <View style={styles.hiddenRow}>
        <View style={styles.deleteView}>
          <Icon.Button name="remove" backgroundColor={'red'} onPress={() => this.props.removeHistory(this.props.id)} />
        </View>
      </View>
      {(this.props.user) ?
      <View style={styles.container}>
        <Image source={{ uri: this.props.user.pic}} style={styles.photo} />
        <View style={styles.info}>
          <Text style={styles.name}>{this.props.user.name}</Text>
          <Text style={styles.post}>{this.props.post}</Text>
          <Text style={styles.timestamp}>
            {this.callStatusIcon()} {this.props.timestamp}
          </Text>
        </View>
      </View>
      :
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.name}>anonymous</Text>
          <Text style={styles.post}>{this.props.post}</Text>
          <Text style={styles.timestamp}>
            {this.callStatusIcon()} {this.props.timestamp}
          </Text>
        </View>
      </View>
      }
    </SwipeRow>
    );
  }

  callStatusIcon() {
    switch (this.props.method) {
      case 'out': return <MaterialIcons name="call-made" style={styles.call} />
      case 'out-missed': return <MaterialIcons name="call-missed-outgoing" style={styles.callMissed} />
      case 'in': return <MaterialIcons name="call-received" style={styles.call} />
      case 'in-missed': return <MaterialIcons name="phone-missed" style={styles.callMissed} />
    }
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
  hiddenRow: {
    // backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'flex-end',
  },
  deleteView: {
    backgroundColor: 'red',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  callMissed: {
    color: 'red',
  },
  call: {
    color: 'green',
  },
});
