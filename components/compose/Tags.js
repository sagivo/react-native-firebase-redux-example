'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Tags extends Component {
  constructor(props) {
    super(props);

    // const ds = ;
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        .cloneWithRows(this.constructor.list),
      newPostTags: new Set(),
    }

    this.renderTag = this.renderTag.bind(this);
  }

  static get list() {
    return [
      { text: 'everything', icon: 'star-o' },
      { text: 'politics', icon: 'star-o' },
      { text: 'fun', icon: 'star' },
      { text: 'love', icon: 'phone' },
      { text: 'sports', icon: 'facebook' },
      { text: 'humor', icon: 'star-o' },
      { text: 'relations', icon: 'star-o' },
      { text: 'colture', icon: 'star-o' },
    ];
  }

  onTagPress(tag) {
    const newPostTags = new Set(this.state.newPostTags);
    if (newPostTags.has(tag)) newPostTags.delete(tag);
    else newPostTags.add(tag);
    this.setState({
      ...this.state,
      newPostTags,
      dataSource: this.state.dataSource.cloneWithRows(this.constructor.list),
    });
  }

  get selectedTags() {
    return this.state.newPostTags;
  }

  renderTag(tag, i) {
    console.log('?',this.selectedTags);
    return (
      <View style={styles.tagContainer}>
        <Icon.Button
          onPress={() => this.onTagPress(tag.text)}
          title={tag.text}
          name={tag.icon}
          key={i}
          style={styles.tag}
          backgroundColor={this.selectedTags.has(tag.text) ? '#4C49FF' : '#736E73'}
        >{tag.text}</Icon.Button>
      </View>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderTag}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tagContainer: {
    margin: 5,
  },
  tag: {
    margin: 0,
  },
});
