'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Text, View, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';

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
      imageAnimationEnded: false,
    };

    this.imageAnimationEnded = this.imageAnimationEnded.bind(this);
  }

  submit() {
    console.log('submited');
  }

  goToContacts() {
  }

  imageAnimationEnded() {
    this.setState({ ...this.state, imageAnimationEnded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Contact!</Text>
        <Text style={styles.subtitle}>now you can be in touch anytime</Text>
        <View style={styles.images}>
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
              source={{uri: 'https://randomuser.me/api/portraits/men/26.jpg'}} style={styles.image}/>
            <Text style={styles.name}>Richard Zilberman</Text>
          </Animatable.View>
        </View>
        <TouchableHighlight style={styles.buttonContainer} onPress={this.goToContacts}>
          <Text
            style={styles.button}
            title="Go to contacts"
            color="#96ffe1"
            accessibilityLabel="Learn more about this purple button"
          >Go to contacts</Text>
        </TouchableHighlight>
      </View>
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
  },
  images: {
    marginTop: 50,
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
    padding: 10,
  },
  button: {
    fontSize: 20,
    color: 'red',
  }
});

export default connect(mapStateToProps, matchDispatchToProps)(ReviewContainer);
