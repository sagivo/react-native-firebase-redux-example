'use strict';

import React, {Component} from 'react';
import { View, Button, ListView } from 'react-native'
import {bindActionCreators} from 'redux';
import ContactList from '../components/contact/ContactList';
import * as contactActions from '../actions/contactActions';
import { connect } from 'react-redux';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

function mapStateToProps(state) {
  return {
    refreshing: state.contactReducer.refreshing,
    contacts: state.contactReducer.contacts,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onData: contactActions.onData,
    syncPosts: contactActions.syncPosts,
    onCallPress: contactActions.onCallPress,
  }, dispatch);
}

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.onCallPress = this.onCallPress.bind(this);
  }

  onCallPress(postId) {
    this.props.onCallPress(postId);
  }

  render() {
    return (
      <ContactList
        contacts={this.props.contacts}
        onCallPress={this.onCallPress}
        refreshing={this.props.refreshing}
        />
    );
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
