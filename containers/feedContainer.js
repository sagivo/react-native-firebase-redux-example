'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, RefreshControl } from 'react-native'
import {bindActionCreators} from 'redux';
import Post from '../components/feed/Post';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';
import * as navigationActions from  '../actions/navigationActions';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {
  return r1.id !== r2.id;
}});

function mapStateToProps(state) {
  return {
    posts: state.FeedReducer.posts,
    refreshing: state.FeedReducer.refreshing,
    dataSource: dataSource.cloneWithRows(state.FeedReducer.posts),
    userId: state.UserReducer.id,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
    syncPosts: feedActions.syncPosts,
    callPost: feedActions.callPost,
    // setNav: navigationActions.setNav,
  }, dispatch);
}

class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.onCallPress = this.onCallPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.syncPosts();
  }

  onRefresh() {
    this.props.syncPosts();
  }

  onCallPress(postId, postText) {
    console.log('press');
    // this.props.callPost(postId, postText, (callId) => this.props.navigation.navigate('Call', { callId }));
  }

  render() {
    return (
      <View>
        <View>
          <ListView
            dataSource={this.props.dataSource}
            renderRow={(data) => <Post {...data} currentUserId={this.props.userId} onCallPress={() => this.onCallPress(data.id, data.text)} />}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#383838"
                colors={['#ff0000', '#646464', '#CACACA']}
                progressBackgroundColor="#474747"
              />
            }
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(FeedContainer);
