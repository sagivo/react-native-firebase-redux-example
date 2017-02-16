'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import ComposeButton from './buttons/ComposeButton';
import * as feedActions from '../actions/feedActions';
import { connect } from 'react-redux';
import { Button, TextInput, View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import Tags from '../components/compose/Tags';

const colors = ['red', '#6ca024', 'green', '#6d9a9c'];

function mapStateToProps(state) {
  return {
    newPostColor: state.FeedReducer.newPostColor,
    newPostTags: state.FeedReducer.newPostTags,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addPost: feedActions.addPost,
    setComposeText: feedActions.setComposeText,
    setComposeColor: feedActions.setComposeColor,
    toggleTag: feedActions.toggleTag,
  }, dispatch);
}

class ComposeContainer extends Component {
  static navigationOptions = {
    title: 'Compose',
    header: {
      right: <ComposeButton />,
    },
  }

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onTagPress = this.onTagPress.bind(this);
  }

  onChangeText(text) {
    this.props.setComposeText(text);
  }

  onTagPress(tag) {
    this.props.toggleTag(tag);
  }

  renderColors() {
    return colors.map(c => {
      return <TouchableHighlight
        style={[styles.circle, {backgroundColor: c}]}
        onPress={() => this.props.setComposeColor(c)}
        key={c}
        >
          <View />
        </TouchableHighlight>
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.upper}>
          <TextInput
            style={[styles.text, {backgroundColor: this.props.newPostColor}]}
            placeholder="What do you want to talk about?"
            onChangeText={this.onChangeText}
            multiline={true}
            maxLength={100}
            underlineColorAndroid="transparent"
          />
          <View style={styles.colors}>
            {this.renderColors()}
          </View>
        </View>
        <View style={styles.tags}>
          <Tags onTagPress={this.onTagPress} selectedTags={this.props.newPostTags} />
        </View>
      </ScrollView>
    );
  }
}

const colorRadius = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    // flexDirection: 'row',
  },
  text: {
    // flex: 1,
    // marginTop: 50,
    padding: 30,
    fontSize: 30,
    borderWidth: 0,
    height: 240,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colors: {
    // width: 30,
    // height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: 'blue',
  },
  tags: {
    flex: 1,
    // backgroundColor: 'black'
  },
  circle: {
    // padding: 10,
    margin: 10,
    width: colorRadius,
    height: colorRadius,
    borderRadius: colorRadius/2,
  }
});

export default connect(mapStateToProps, matchDispatchToProps)(ComposeContainer);
