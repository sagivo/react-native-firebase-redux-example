'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, RefreshControl } from 'react-native'
import Post from './Post';

export default class Feed extends Component {
  constructor(props) {
    super(props);

  }

  onCallPress(postId) {
    if (this.props.onCallPress) this.props.onCallPress(postId);
  }

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(data, rowId) => <Post {...data} onCallPress={() => this.onCallPress(post.id)} />}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    );
  }
}
