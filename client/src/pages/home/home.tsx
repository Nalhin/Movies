import React from 'react';
import { View, Text, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { ROOT_ROUTES } from '../root.routes';
import { useUser } from '../../shared/context/auth/use-user/use-user';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';

const Home = () => {
  const navigation = useNavigation();
  const user = useUser();
  const auth = useAuth();

  return (
    <View style={tailwind('flex items-center justify-center h-full flex-col')}>
      <Text style={tailwind('text-4xl font-bold')}>Movies!</Text>
      <Text>Pocket movie database</Text>
      <Image
        source={require('../../../assets/movie-landing.jpg')}
        resizeMode={'contain'}
        style={tailwind('w-full h-80')}
      />
      {user.isAuthenticated ? (
        <>
          <Text>Welcome back {user.username}</Text>
          <View style={tailwind('w-80 my-1')}>
            <Button
              title="Continue"
              accessibilityLabel="Continue"
              type="solid"
              onPress={() => navigation.navigate(ROOT_ROUTES.MAIN)}
            />
          </View>
          <View style={tailwind('w-80 my-1')}>
            <Button
              title="Logout"
              accessibilityLabel="Logout"
              type="solid"
              onPress={auth.logoutUser}
            />
          </View>
        </>
      ) : (
        <>
          <Button
            title="Skip logging"
            accessibilityLabel="Skip logging"
            type="solid"
            style={tailwind('w-80 py-1')}
            onPress={() => navigation.navigate(ROOT_ROUTES.MAIN)}
          />
          <Button
            title="Login"
            accessibilityLabel="Login"
            type="solid"
            style={tailwind('w-80 py-1')}
            onPress={() => navigation.navigate(ROOT_ROUTES.LOGIN)}
          />
          <Button
            title="Sign up"
            accessibilityLabel="Sign up"
            type="solid"
            style={tailwind('w-80 py-1')}
            onPress={() => navigation.navigate(ROOT_ROUTES.SIGN_UP)}
          />
        </>
      )}
    </View>
  );
};

export default Home;
