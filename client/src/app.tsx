import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { CheckBox, Rating } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={tailwind('bg-blue-300 px-12')}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
      <CheckBox checked size={40} />
      <Rating />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
