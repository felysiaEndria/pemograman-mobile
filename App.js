import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [], // berisi maksimal 10 gambar dari gallery
      sudahDimuat: false, // penanda apakah tombol sudah pernah ditekan
    };
  }

  // ===== TUGAS 1: Alert =====
  onPressAlert = () => {
    Alert.alert('Pesan', 'Primakara Luar Biasa');
  };

  // ===== TUGAS 2: CameraRoll =====
  // Meminta izin akses gallery (Android)
  hasAndroidPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    // Android 13 (API 33) ke atas memakai READ_MEDIA_IMAGES,
    // versi di bawahnya memakai READ_EXTERNAL_STORAGE
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

  // Mengambil 10 gambar dari gallery
  onPressGallery = async () => {
    const diizinkan = await this.hasAndroidPermission();
    if (!diizinkan) {
      Alert.alert('Izin ditolak', 'Aplikasi membutuhkan izin untuk membuka gallery.');
      return;
    }

    try {
      const hasil = await CameraRoll.getPhotos({
        first: 10, // jumlah gambar yang diambil
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
      <View style={styles.container}>
        <Text style={styles.title}>Tugas Mandiri Modul I</Text>

        {/* Tugas 1: button Alert */}
        <View style={styles.buttonWrapper}>
          <Button title="Tampilkan Alert" onPress={this.onPressAlert} />
        </View>

        {/* Tugas 2: button CameraRoll */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Tampilkan 10 Gambar dari Gallery"
            color="steelblue"
            onPress={this.onPressGallery}
          />
        </View>

        {/* Komponen penampil gambar dari CameraRoll */}
        <ScrollView contentContainerStyle={styles.gallery}>
          {sudahDimuat && photos.length === 0 && (
            <Text style={styles.emptyText}>Gallery masih kosong.</Text>
          )}

          {photos.map((p, i) => (
            <View key={i} style={styles.imageWrapper}>
              <Image style={styles.image} source={{ uri: p.node.image.uri }} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    marginBottom: 12,
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
    marginTop: 20,
  },
});
