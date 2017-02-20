import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-native'

import * as contactActions from '../../actions/contactActions';

function mapStateToProps(state) {
  return {
    selectedContacts: state.ContactReducer.selectedContacts,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteContacts: contactActions.deleteContacts,
  }, dispatch);
}


class DeleteContactsBtn extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Alert.alert(
      'Delete Contacts?',
      'You will also be removed from their contact list as well.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.deleteContacts() },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      this.props.selectedContacts.size ? <Button title='Delete' onPress={this.onPress} /> : null
    );
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(DeleteContactsBtn)
