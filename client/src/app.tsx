import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Popular from './pages/popular/popular';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Popular />
    </PaperProvider>
  );
}
