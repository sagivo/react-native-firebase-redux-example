'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ScrollView, Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import * as matchActions from '../actions/matchActions';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function mapStateToProps(state) {
  return {
    match: state.MatchReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    syncMatches: matchActions.syncMatches,
    doneMatch: matchActions.doneMatch,
  }, dispatch);
}

class ReviewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageAnimationEnded: false,
    };

    this.props.syncMatches();

    this.imageAnimationEnded = this.imageAnimationEnded.bind(this);
    this.doneMatch = this.doneMatch.bind(this);
  }

  submit() {
    console.log('submited');
  }

  doneMatch() {
    this.props.doneMatch();
  }

  imageAnimationEnded() {
    this.setState({ ...this.state, imageAnimationEnded: true });
  }

  renderMatch(user) {
    console.log('here');
    return (
      <View style={styles.images} key={user.id}>
        <Animatable.View style={styles.anim}
          animation="slideInLeft"
          easing="ease-in-quart"
          delay={500}
          duration={500}
          onAnimationEnd={() => this.imageAnimationEnded()}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/6.jpg'}} style={styles.image}/>
          <Text>You</Text>
        </Animatable.View>
        { this.state.imageAnimationEnded &&
        <Animatable.Text delay={1000} style={styles.plus} animation="bounce" >+</Animatable.Text>
        }
        <Animatable.View style={styles.anim}
          animation="slideInRight"
          easing="ease-in-quart"
          delay={500}
          duration={500}
          onAnimationEnd={() => this.imageAnimationEnded()}>
          <Image
            source={{uri: user.pic}} style={styles.image}/>
          <Text style={styles.name}>{user.name}</Text>
        </Animatable.View>
      </View>
    )
  }

  render() {
    return (
      (this.props.match.hasMatch) ?
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>New Contact!</Text>
        <Text style={styles.subtitle}>now you can be in touch anytime</Text>
        {this.props.match.matches.map(u => this.renderMatch(u))}
        <TouchableHighlight style={styles.buttonContainer} onPress={this.doneMatch}>
          <Text
            style={styles.button}
            title="Go to contacts"
            color="#96ffe1"
            accessibilityLabel="Learn more about this purple button"
          >Go to contacts</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
      :
      <Text>Loading...</Text>
    );
  }
}

const imageSize = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginTop:30,
    fontSize: 30,
    fontFamily: 'Zapfino'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
  },
  images: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  anim: {
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize/2,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 2,
  },
  name: {
    width: 120,
    textAlign: 'center',
  },
  plus: {
    fontSize: 30,
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 70,
    backgroundColor: '#42f4c2',
    padding: 20,
  },
  button: {
    fontSize: 20,
    color: 'red',
  }
});

export default connect(mapStateToProps, matchDispatchToProps)(ReviewContainer);
