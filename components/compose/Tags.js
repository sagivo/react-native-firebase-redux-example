'use strict';

import React, {Component} from 'react';
import { View, Button, ListView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const tags = [
  { text: 'everything', icon: 'star-o' },
  { text: 'politics', icon: 'star-o' },
  { text: 'fun', icon: 'star' },
  { text: 'love', icon: 'phone' },
  { text: 'sports', icon: 'facebook' },
  { text: 'humor', icon: 'star-o' },
  { text: 'relations', icon: 'star-o' },
  { text: 'colture', icon: 'star-o' },
];

export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.renderTags = this.renderTags.bind(this);
  }

  renderTags() {
    return tags.map(tag => {
      return (
        <View style={styles.tagContainer} key={tag.text}>
          <Icon.Button
            onPress={() => this.props.onTagPress(tag.text)}
            title={tag.text}
            name={tag.icon}
            style={styles.tag}
            backgroundColor={this.props.selectedTags.has(tag.text) ? '#4C49FF' : '#736E73'}
          >{tag.text}</Icon.Button>
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTags()}
      </View>
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
