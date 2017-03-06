import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-native'

import * as feedActions from '../../actions/feedActions';

function mapStateToProps(state) {
  return {
    mainNav: state.NavigationReducer.mainNav,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    cancelPost: feedActions.cancelPost,
  }, dispatch);
}


class ComposeBtn extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Alert.alert(
      'Cancel Post?',
      'Your post will be permanently removed.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => this.props.cancelPost(() => {
          return this.props.mainNav.dispatch({
            type: 'Navigation/SET_PARAMS', params: {connecting: null}, key: 'Compose',
          });
          }),
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Button title='Cancel' onPress={this.onPress} />
    );
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(ComposeBtn)
