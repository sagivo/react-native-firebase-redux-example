import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native'

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
    this.props.cancelPost(() => {
      return this.props.mainNav.dispatch({
        type: 'Navigation/SET_PARAMS', params: {connecting: null}, key: 'Compose',
      });
    });
  }

  render() {
    return (
      <Button title='Cancel' onPress={this.onPress} />
    );
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(ComposeBtn)
