import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './pages/root.navigation';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './shared/context/auth/auth-provider/auth-provider';
import { authStorage } from './shared/service/storage/auth-storage.service';

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider authStorage={authStorage}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <RootNavigation />
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
