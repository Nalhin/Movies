import React from 'react';
import { View, Text, Image } from 'react-native';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { ROOT_ROUTES } from '../root.routes';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={tailwind('flex items-center justify-center h-full flex-col')}>
      <Text style={tailwind('text-4xl font-bold')}>Movies!</Text>
      <Text>Pocket movie database</Text>
      <Image
        source={require('../../../assets/movie-landing.jpg')}
        resizeMode={'contain'}
        style={tailwind('w-full h-80')}
      />
      <Button
        title="Skip logging"
        type="solid"
        style={tailwind('w-80 py-1')}
        onPress={() => navigation.navigate(ROOT_ROUTES.MAIN)}
      />
      <Button
        title="Login"
        type="solid"
        style={tailwind('w-80 py-1')}
        onPress={() => navigation.navigate(ROOT_ROUTES.LOGIN)}
      />
      <Button
        title="Sign up"
        type="solid"
        style={tailwind('w-80 py-1')}
        onPress={() => navigation.navigate(ROOT_ROUTES.SIGN_UP)}
      />
    </View>
  );
};

export default Home;
