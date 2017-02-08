'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, RefreshControl } from 'react-native'
import {bindActionCreators} from 'redux';
import Post from '../components/feed/Post';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';
import * as navigationActions from  '../actions/navigationActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {
  return r1.id !== r2.id;
}});

function mapStateToProps(state) {
  return {
    posts: state.FeedReducer.posts,
    refreshing: state.FeedReducer.refreshing,
    dataSource: dataSource.cloneWithRows(state.FeedReducer.posts),
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
    syncPosts: feedActions.syncPosts,
    callPost: feedActions.callPost,
    setNav: navigationActions.setNav,
  }, dispatch);
}

class FeedContainer extends Component {
  static navigationOptions = {
    header: () => ({
      visible: false
    }),
    tabBar: {
      icon: ({ tintColor }) => (
        <MaterialIcons name="home" size={30} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);

    this.onCallPress = this.onCallPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.syncPosts();
  }

  componentDidMount() {
    this.props.setNav(this.props.navigation);
  }

  onRefresh() {
    this.props.syncPosts();
  }

  onCallPress(postId, postText) {
    this.props.callPost(postId, postText, (callId) => this.props.navigation.navigate('Call', { callId }));
  }

  render() {
    return (
      <View>
        <View>
          <ListView
            dataSource={this.props.dataSource}
            renderRow={(data) => <Post {...data} onCallPress={() => this.onCallPress(data.id, data.text)} />}
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
