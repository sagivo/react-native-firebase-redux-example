'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';
import languages from "../models/languages";
import {logout} from "../models/authMiddleware";

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncUser: userActions.syncUser,
    updateUser: userActions.updateUser,
  }, dispatch);
}

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.props.syncUser();
  }

  get laguagesText() {
    if (!this.props.user.languages) return;
    return Object.keys(this.props.user.languages).map(code => languages[code].name).join(', ');
  }

  logoutPress() {
    logout();
  }

  setGender(gender) {
    this.props.updateUser('gender', gender);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <View style={styles.name}>
            <Text style={styles.nameText}>{this.props.user.name}</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.rating}>
              <Icon name="star-o" style={styles.statsIcon} />
              <Text style={styles.statsFont}>4.2</Text>
            </View>
            <View style={styles.pic}>
              <Image source={{uri: 'https://randomuser.me/api/portraits/men/6.jpg'}} style={styles.image} />
            </View>
            <View style={styles.rating}>
              <Icon name="user-o" style={styles.statsIcon} />
              <Text style={styles.statsFont}>4</Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.tip}>
            <Icon name="lock" style={styles.tipText} />
            <Text style={styles.tipText}> This private info will help matching you better</Text>
          </View>

          <View style={styles.row}>
            <Icon name="envelope-o" style={styles.rowIcon} />
            <TextInput value={this.props.user.email} style={styles.rowInput} placeholder={'email'} underlineColorAndroid={'transparent'} />
          </View>
          <View style={styles.hr} />

          <View style={styles.row}>
            <Icon name="map-o" style={styles.rowIcon} />
            <Text style={styles.rowInput} placeholder={'address'} underlineColorAndroid={'transparent'}>{this.props.user.address}</Text>
          </View>
          <View style={styles.hr} />

          <View style={styles.row}>
            <Icon name="flag" style={styles.rowIcon} />
            <Text style={styles.rowInput} placeholder={'language'} underlineColorAndroid={'transparent'}>{this.laguagesText}</Text>
          </View>
          <View style={styles.hr} />

          <View style={styles.row}>
            <Icon name="male" style={[styles.rowIcon, styles.gender, this.props.user.gender === 'm' ? styles.selected : null]} onPress={() => this.setGender('m')} />
            <Icon name="female" style={[styles.rowIcon, styles.gender, , this.props.user.gender === 'f' ? styles.selected : null]} onPress={() => this.setGender('f')} />
          </View>
          <View style={styles.row}>
            <TouchableHighlight onPress={this.logoutPress}><Text>Logout</Text></TouchableHighlight >
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 220,
    backgroundColor: '#DFDEB8',
  },
  name: {
    alignItems: 'center',
    marginTop: 20,
  },
  nameText: {
    fontSize: 18,
    color: '#97977D',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
    borderColor: '#97977D',
    borderBottomWidth: 1,

  },
  rating: {
    alignItems: 'center',
    width: 40,
  },
  statsIcon: {
    fontSize: 30,
    color: '#97977D',
  },
  statsFont: {
    marginTop: 5,
    fontSize: 12,
    color: '#97977D',
  },
  pic: {
    paddingHorizontal: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: '#97977D',
    borderWidth: 1,
  },
  details: {
    marginTop: 20,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 12,
    color: '#97977D',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#97977D',
    padding: 20,
    // backgroundColor: 'blue',
  },
  rowInput: {
    // borderBottomWidth: 1,
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },
  rowIcon: {
    fontSize: 20,
    color: '#97977D',
  },
  hr: {
    height: 1,
    backgroundColor: '#97977D',
  },
  gender: {
    fontSize: 30,
    paddingHorizontal: 20,
  },
  selected: {
    color: 'blue',
  }
});
