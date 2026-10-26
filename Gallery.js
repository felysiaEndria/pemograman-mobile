// Gallery.js

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

/* Kode Modul I: Alert dan CameraRoll */
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      sudahDimuat: false,
    };
  }

  onPressAlert = () => {
    Alert.alert('Pesan', 'Primakara Luar Biasa');
  };

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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Gallery Page</Text>

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
    marginTop: 10,
  },
});
