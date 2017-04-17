'use strict';

import React, {Component} from 'react';
import { Alert, StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';
import { signOut } from '../models/auth';
import languages from "../models/languages";
import { COLORS } from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

function mapStateToProps(state) {
  return {
    user: state.UserReducer,
    mainNav: state.NavigationReducer.mainNav,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser: userActions.updateUser,
    logout: userActions.logout,
  }, dispatch);
}

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.logoutPress = this.logoutPress.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.infoContacts = this.infoContacts.bind(this);
    this.getPic = this.getPic.bind(this);
  }

  get laguagesText() {
    if (!this.props.user.languages) return;
    return Object.values(this.props.user.languages).join(', ');
  }

  updateEmail() {
    const newEmail = this.refs.emailInput._lastNativeText;
    if (newEmail != this.props.email) this.props.updateUser('newEmail', newEmail);
  }

  logoutPress() {
    signOut().then(() => this.props.navigation.navigate('Splash'));
  }

  setGender(gender) {
    this.props.updateUser('gender', gender);
  }

  infoRating() {
    Alert.alert('Average Score', 'This is your average score. The better your score, the better matching.')
  }

  setLanguage() {
    this.props.navigation.navigate('Language');
    //this.props.mainNav._navigation.navigate('Language');
  }

  infoContacts() {
    this.props.navigation.navigate('Contact');
  }

  getPic() {
    const { fbId } = this.props.user;
    return (fbId) ? `https://graph.facebook.com/${fbId}/picture?width=200` : `require('../images/bunny.jpg')`;
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
              <TouchableHighlight onPress={this.infoRating}><Icon name="star-o" style={styles.statsIcon} /></TouchableHighlight>
              <Text style={styles.statsFont}>{this.props.user.rating || '?'}</Text>
            </View>
            <View style={styles.pic}>
              <Image source={{uri: this.getPic()}} style={styles.image} defaultSource={require('../images/bunny.jpg')} />
            </View>
            <View style={styles.rating}>
              <TouchableHighlight onPress={this.infoContacts}><Icon name="user-o" style={styles.statsIcon} /></TouchableHighlight>
              <Text style={styles.statsFont}>{this.props.user.contacts}</Text>
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
            <TextInput ref="emailInput"
              onBlur={() => this.updateEmail()}
              defaultValue={this.props.user.newEmail || this.props.user.email} style={styles.rowInput} placeholder={'email'}
              underlineColorAndroid={'transparent'} />
          </View>
          <View style={styles.hr} />

          <TouchableHighlight onPress={this.setLanguage}>
            <View style={styles.row}>
              <Icon name="flag" style={styles.rowIcon} />
              <Text style={styles.rowInput} placeholder={'languages'} underlineColorAndroid={'transparent'}>{this.laguagesText}</Text>
            </View>
          </TouchableHighlight>
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
    backgroundColor: COLORS.c2,
  },
  name: {
    alignItems: 'center',
    marginTop: 20,
  },
  nameText: {
    fontSize: 18,
    color: COLORS.c1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
    borderColor: COLORS.c1,
    borderBottomWidth: 1,

  },
  rating: {
    alignItems: 'center',
    width: 40,
  },
  statsIcon: {
    fontSize: 30,
    color: COLORS.c1,
  },
  statsFont: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.c1,
  },
  pic: {
    paddingHorizontal: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: COLORS.c1,
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
    color: COLORS.c1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.c1,
    padding: 20,
  },
  rowInput: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  rowIcon: {
    fontSize: 20,
    color: COLORS.c1,
  },
  hr: {
    height: 1,
    backgroundColor: COLORS.c1,
  },
  gender: {
    fontSize: 30,
    paddingHorizontal: 20,
  },
  selected: {
    color: COLORS.c2,
  }
});
