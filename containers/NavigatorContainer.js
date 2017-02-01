'use strict';

import { addNavigationHelpers } from 'react-navigation';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainNavigator from '../components/navigation/MainNavigator';
import * as navigationActions from  '../actions/navigationActions';

function mapStateToProps(state) {
  return {
    // nav: state.NavigationReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    dispatch,
  }, dispatch);
}

class NavigatonContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainNavigator
//        navigation={addNavigationHelpers({
//          state: this.props.nav,
//          dispatch: this.props.dispatch
//        })}
      />
    );
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(NavigatonContainer);
