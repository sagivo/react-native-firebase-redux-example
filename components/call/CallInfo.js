import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet, Image, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { callStatus, callMethod } from '../../models/call';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

export default class CallInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text1: null,
      callStatus: null,
      timer: null,
    }
  }

  answer(startTime) {
    // const startTime = new Date().getTime(); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
    this.interval = setInterval(() => {
      const duration = moment.duration(new Date().getTime() - startTime);
      this.setState({
        ...this.state,
        timer: moment.utc(duration.asMilliseconds()).format('mm:ss'),
      });
    }, 1000);
  }

  hang() {
    clearInterval(this.interval);
  }

  renderConnecting() {
    return (
      <View style={styles.caller}>
        {this.props.user.pic && <View style={styles.pic}>
          <Image source={{uri: this.props.user.pic}} style={styles.image} />
        </View>}
        <Text style={styles.callerName}>{this.state.text1}</Text>
        {
          this.state.timer ?
          <Text style={styles.infoText}>{this.state.timer}</Text>
          :
          <Animatable.Text style={styles.infoText} iterationCount="infinite" duration={2000} animation="flash">
            {this.state.callStatus}
          </Animatable.Text>
        }
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    //connecting
    if (nextProps.status === callStatus.CONNECTING) this.setState({
      ...this.state,
      text1: nextProps.topic ? nextProps.topic : nextProps.user.name,
      callStatus: nextProps.method === callMethod.IN ? 'Incoming call...' : 'Connecting...',
    });

    //call started
    if (nextProps.status === callStatus.START) this.answer(nextProps.start);
    if (nextProps.status === callStatus.END) this.hang();
  }

  render() {
    if (!this.props.status) return <View></View>;
    return (
      <View style={styles.caller}>
        {this.props.user.pic && <View style={styles.pic}>
          <Image source={{uri: this.props.user.pic}} style={styles.image} />
        </View>}
        <Text style={styles.callerName}>{this.state.text1}</Text>
        {
          this.state.timer ?
          <Text style={styles.infoText}>{this.state.timer}</Text>
          :
          <Animatable.Text style={styles.infoText} iterationCount="infinite" duration={2000} animation="flash">
            {this.state.callStatus}
          </Animatable.Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  caller: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  callerName: {
    fontSize: 30,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  infoText: {
    marginTop: 35,
    fontSize: 16,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: '#97977D',
    borderWidth: 1,
  },
});
