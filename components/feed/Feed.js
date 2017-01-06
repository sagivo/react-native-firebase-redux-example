'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, RefreshControl } from 'react-native'
import Post from './Post';

export default class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(data, rowId) => <Post {...data} onCallPress={() => this.props.onCallPress(data.id)} key={data.id} />}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#383838"
            colors={['#ff0000', '#646464', '#CACACA']}
            progressBackgroundColor="#474747"
          />
        }
      />
    );
  }
}
