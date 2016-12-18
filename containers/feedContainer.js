'use strict';

import React, {Component} from 'react';
import { View, Button, ListView } from 'react-native'
import {bindActionCreators} from 'redux';
import Feed from '../components/feed/Feed';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

function mapStateToProps(state) {
  return {
    dataSource: dataSource.cloneWithRows(state.FeedReducer.posts),
    refreshing: state.FeedReducer.refreshing,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
    syncPosts: feedActions.syncPosts,
    onCallPress: feedActions.onCallPress,
  }, dispatch);
}

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.btnPress = this.btnPress.bind(this);
    this.onCallPress = this.onCallPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.syncPosts();
  }

  btnPress() {
    this.props.addPost({text: (new Date()).getTime()});
  }

  onCallPress(postId) {
    this.props.onCallPress(postId);
  }

  render() {
    return (
      <View>
        <View>
          <Feed
            dataSource={this.props.dataSource}
            onCallPress={this.onCallPress}
            onRefresh={this.onRefresh}
            refreshing={this.props.refreshing}
            />
        </View>
        <View><Button onPress={this.btnPress} title="add post" accessibilityLabel="See an informative alert" >aaa</Button></View>
      </View>
    );
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
