import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  TextInput,
  Keyboard,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

/* =====================================================================
   MODUL II - TUGAS MANDIRI 1
   Tombol "Tampilkan" / "Sembunyikan" untuk teks Hello World.
   - PROPS : text, showLabel, hideLabel (dikirim dari parent, read-only)
   - STATE : isShowing (berubah ketika tombol ditekan)
   - METHOD: toggleText
   ===================================================================== */
class HelloToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: false };
  }

  // method untuk mengubah state
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

        {/* teks hanya dirender jika state isShowing bernilai true */}
        {isShowing && <Text style={styles.resultText}>{this.props.text}</Text>}
      </View>
    );
  }
}

/* =====================================================================
   MODUL II - TUGAS MANDIRI 2
   Input text + tombol submit, teks yang diinput ditampilkan saat submit.
   - PROPS : placeholder, buttonTitle
   - STATE : inputText (isi kolom input), submittedText (teks setelah submit)
   - METHOD: onChangeInput, onSubmit
   ===================================================================== */
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

/* =====================================================================
   APP UTAMA
   ===================================================================== */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      sudahDimuat: false,
    };
  }

  // ===== MODUL I - Tugas 1: Alert =====
  onPressAlert = () => {
    Alert.alert('Pesan', 'Primakara Luar Biasa');
  };

  // ===== MODUL I - Tugas 2: CameraRoll =====
  hasAndroidPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const sudahDiizinkan = await PermissionsAndroid.check(permission);
    if (sudahDiizinkan) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === PermissionsAndroid.RESULTS.GRANTED;
  };

  onPressGallery = async () => {
    const diizinkan = await this.hasAndroidPermission();
    if (!diizinkan) {
      Alert.alert('Izin ditolak', 'Aplikasi membutuhkan izin untuk membuka gallery.');
      return;
    }

    try {
      const hasil = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      });
      this.setState({
        photos: hasil.edges,
        sudahDimuat: true,
      });
    } catch (error) {
      Alert.alert('Gagal', 'Tidak dapat membaca gallery: ' + error.message);
    }
  };

  render() {
    const { photos, sudahDimuat } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        {/* ---------- MODUL II ---------- */}
        <Text style={styles.title}>MODUL II: Props, State, Method</Text>

        <HelloToggle
          text="Hello World"
          showLabel="Tampilkan"
          hideLabel="Sembunyikan"
        />

        <InputSubmit placeholder="Ketik sesuatu di sini" buttonTitle="Submit" />

        {/* ---------- MODUL I ---------- */}
        <Text style={[styles.title, styles.sectionGap]}>
          Modul I: Alert dan CameraRoll
        </Text>

        <View style={styles.card}>
          <View style={styles.buttonWrapper}>
            <Button title="Tampilkan Alert" onPress={this.onPressAlert} />
          </View>

          <Button
            title="Tampilkan 10 Gambar dari Gallery"
            color="steelblue"
            onPress={this.onPressGallery}
          />

          <View style={styles.gallery}>
            {sudahDimuat && photos.length === 0 && (
              <Text style={styles.emptyText}>Gallery masih kosong.</Text>
            )}

            {photos.map((p, i) => (
              <View key={i} style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: p.node.image.uri }} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: (StatusBar.currentHeight || 0) + 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionGap: {
    marginTop: 24,
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
  buttonWrapper: {
    marginBottom: 12,
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
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imageWrapper: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    flex: 1,
    backgroundColor: '#eee',
  },
  emptyText: {
    width: '100%',
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
});