import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';

const App = () => (
    <AppNavigator />
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
