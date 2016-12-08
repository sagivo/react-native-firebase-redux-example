'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, RefreshControl } from 'react-native'
import Post from './Post';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  onCallPress(postId) {
    if (this.props.onCallPress) this.props.onCallPress(postId);
  }

  renderRow(post, i) {
    return (
      <Post
        text={post.text}
        key={post.id}
        time={post.time}
        review={post.review}
        onCallPress={() => this.onCallPress(post.id)}
        />
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
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
