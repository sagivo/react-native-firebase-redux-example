import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native'

import * as feedActions from '../../actions/feedActions';

function mapStateToProps(state) {
  return {
    newPostText: state.FeedReducer.newPostText,
    mainNav: state.NavigationReducer.mainNav,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
  }, dispatch);
}


class ComposeBtn extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  onPress() {
    this.props.addPost(() => {
      this.props.mainNav.dispatch({ type: 'Navigation/NAVIGATE', routeName: 'Feed' });
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <Button title='Post' disabled={!this.props.newPostText} onPress={this.onPress} />
    );
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(ComposeBtn)
