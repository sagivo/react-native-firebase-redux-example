'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import CallButtons from '../components/call/CallButtons';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function mapStateToProps(state) {
  return {
    // call: state.CallReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    // syncCalls: callActions.syncCalls,
  }, dispatch);
}

class ReviewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      thumb: null,
      readyToSubmit: false,
      reportReason: '',
    };

    this.submit = this.submit.bind(this);
    this.renderStars = this.renderStars.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.calculateReadyTosubmit = this.calculateReadyTosubmit.bind(this);
  }

  submit() {
    console.log('submited');
  }

  onChangeText(text) {
    this.setState({ ...this.state, reportReason: text });
  }

  starPressed(i) {
    this.setState({ ...this.state, rating: i });

    this.refs['star' + i].pulse(500);
  }

  calculateReadyTosubmit() {
    return ((this.state.rating > 1) && (this.state.thumb !== null)) ||
    ((this.state.rating === 1) && (this.state.reportReason.length > 0))
  }

  thumbsPressed(thumb) {
    this.setState({ ...this.state, thumb });

    if (thumb === 'up') this.refs.thumbsUpAnim.pulse(500);
  }

  renderStars() {
    const stars = [];
    for(const i = 1 ; i < 6 ; i++) {
      stars.push(
        <Animatable.View ref={'star' + i} key={'star' + i}>
          <MaterialIcons onPress={() => this.starPressed(i)} name={this.state.rating >= i ? 'star' : 'star-border'} style={styles.star}/>
        </Animatable.View>
      )
    };
    return stars;
  }

  render() {
    console.log('ready',this.calculateReadyTosubmit())
    return (
      <View style={styles.container}>
        <View style={styles.starsContainer}>
          <Text style={styles.title}>How was your talk?</Text>
          <View style={styles.stars}>
            {this.renderStars()}
          </View>
        </View>
        {(this.state.rating === 1) ?
          <View style={styles.flags}>
          <MaterialIcons onPress={() => this.starPressed(i)} name="report" style={styles.flag}/>
          <TextInput
            style={styles.input}
            placeholder="Tell us what went wrong..."
            multiline={true}
            maxLength={100}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View> :
        <View style={styles.thumbsContainer}>
          <Text style={styles.title}>Share my profile if there's a match?</Text>
          <View style={styles.thumbs}>
            <Animatable.View ref="thumbsUpAnim">
              <MaterialIcons name="thumb-up" style={this.state.thumb === 'up' ? styles.thumbSelected : styles.thumb} onPress={() => this.thumbsPressed('up')}/>
            </Animatable.View>
            <MaterialIcons name="thumb-down" style={this.state.thumb === 'down' ? styles.thumbSelected : styles.thumb} onPress={() => this.thumbsPressed('down')}/>
          </View>
        </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  starsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 50,
    color: 'blue',
  },
  flags: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flag: {
    // flex: 1,
    fontSize: 30,
  },
  input: {
    fontSize: 20,
    flex: 6,
    marginLeft: 10,
    color: 'black',
    // backgroundColor: 'blue',
  },
  thumbsContainer: {
    flex: 2,
    alignItems: 'center',
  },
  thumbs: {
    flexDirection: 'row',
  },
  thumb: {
    fontSize: 50,
    margin: 20,
  },
  thumbSelected: {
    fontSize: 50,
    margin: 20,
    color: 'blue',
  },
  title: {
    fontSize: 20,
  }
});

export default connect(mapStateToProps, matchDispatchToProps)(ReviewContainer);
