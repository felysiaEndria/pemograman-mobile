// Home.js

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

/* ---------- Modul III Tugas 1: Tampilkan / Sembunyikan ----------
   PROPS : text, showLabel, hideLabel
   STATE : isShowing
   METHOD: toggleText                                              */
class HelloToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: false };
  }

  toggleText = () => {
    this.setState(previousState => ({
      isShowing: !previousState.isShowing,
    }));
  };

  render() {
    const { isShowing } = this.state;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tugas 1: Tampilkan / Sembunyikan</Text>
        <Button
          title={isShowing ? this.props.hideLabel : this.props.showLabel}
          onPress={this.toggleText}
        />
        {isShowing && <Text style={styles.resultText}>{this.props.text}</Text>}
      </View>
    );
  }
}

/* ---------- Modul III Tugas 2: Input Text dan Submit ----------
   PROPS : placeholder, buttonTitle
   STATE : inputText, submittedText
   METHOD: onChangeInput, onSubmit                                  */
class InputSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      submittedText: '',
    };
  }

  onChangeInput = text => {
    this.setState({ inputText: text });
  };

  onSubmit = () => {
    if (this.state.inputText.trim() === '') {
      Alert.alert('Peringatan', 'Teks masih kosong, silakan isi terlebih dahulu.');
      return;
    }
    Keyboard.dismiss();
    this.setState({ submittedText: this.state.inputText });
  };

  render() {
    const { inputText, submittedText } = this.state;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tugas 2: Input Text dan Submit</Text>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          value={inputText}
          onChangeText={this.onChangeInput}
        />
        <Button title={this.props.buttonTitle} onPress={this.onSubmit} />
        {submittedText !== '' && (
          <Text style={styles.resultText}>
            Teks yang diinput: {submittedText}
          </Text>
        )}
      </View>
    );
  }
}

/* ---------- Screen Home ---------- */
export default class Home extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Home Page</Text>

        <HelloToggle
          text="Hello World"
          showLabel="Tampilkan"
          hideLabel="Sembunyikan"
        />

        <InputSubmit placeholder="Ketik sesuatu di sini" buttonTitle="Submit" />

        <Button
          title="Goto About Page"
          onPress={() => this.props.navigation.navigate('About')}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultText: {
    marginTop: 12,
    fontSize: 18,
    textAlign: 'center',
  },
});
