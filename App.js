// App.js

import React from 'react';
import { Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Gallery from './Gallery';
import About from './About';

// Tab navigation: pola sama seperti StackNavigator / DrawerNavigator di modul,
// yaitu object yang berisi daftar screen.
const TabNavigator = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
      },
    },
    Gallery: {
      screen: Gallery,
      options: {
        title: 'Gallery',
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>🖼️</Text>,
      },
    },
    About: {
      screen: About,
      options: {
        title: 'About',
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>ℹ️</Text>,
      },
    },
  },
});

const App = createStaticNavigation(TabNavigator);

export default App;
