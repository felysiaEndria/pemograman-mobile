// About.js

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About Page</Text>
        <Text style={styles.desc}>
          Aplikasi latihan React Native: Basic Component, Props, State, Method,
          dan Tab Navigation dengan React Navigation.
        </Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
