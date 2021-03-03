import React from 'react';
import { Card } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

interface Props {
  title: string;
  posterPath: string;
  onPress: () => void;
}

const MovieCardSmall = ({ title, posterPath, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        wrapperStyle={tailwind('w-40')}
        containerStyle={tailwind('p-0 m-1')}
      >
        <Text style={tailwind('text-center font-bold my-2')} numberOfLines={1}>
          {title}
        </Text>
        <Card.Image
          source={{ uri: posterPath }}
          resizeMethod={'resize'}
          style={tailwind('h-60')}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCardSmall;
