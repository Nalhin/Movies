import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './pages/root.navigation';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './shared/context/auth/auth-provider/auth-provider';
import { authStorage } from './shared/services/storage/auth-storage.service';
import { LogBox } from 'react-native';

const queryClient = new QueryClient();
LogBox.ignoreLogs([/setting a timer/i]);

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider
        authStorage={authStorage}
        onLogout={[() => queryClient.getQueryCache().clear]}
      >
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <RootNavigation />
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
