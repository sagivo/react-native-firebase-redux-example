'use strict';

import React, {Component} from 'react';
import { View, Button, ListView } from 'react-native'
import {bindActionCreators} from 'redux';
import ContactList from '../components/contact/ContactList';
import Loading from '../components/shared/Loading';
import * as contactActions from '../actions/contactActions';
import { connect } from 'react-redux';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

function mapStateToProps(state) {
  return {
    refreshing: state.ContactReducer.refreshing,
    contacts: state.ContactReducer.contacts,
    selectedContacts: state.ContactReducer.selectedContacts,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    // onData: contactActions.onData,
    syncContacts: contactActions.syncContacts,
    onCall: contactActions.onContactCallPress,
    toggleSelectedContacts: contactActions.toggleSelectedContacts,
  }, dispatch);
}

class ContactContainer extends Component {
  constructor(props) {
    super(props);

    this.onCall = this.onCall.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
  }

  componentWillMount() {
    this.props.syncContacts();
  }

  onLongPress(id) {
    this.props.toggleSelectedContacts(id);
  }

  onCall(userId) {
    this.props.onCall(userId);
  }

  render() {
    return (
      (!this.props.refreshing) ?
      <ContactList
        contacts={this.props.contacts}
        onCall={this.onCall}
        onLongPress={this.onLongPress}
        selectedContacts={this.props.selectedContacts}
        />
      :
      <Loading />
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactContainer);
