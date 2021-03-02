import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import tailwind from 'tailwind-rn';

interface Props {
  name: string;
  character: string;
  profilePath: string;
}

const MovieCastItem = ({ name, character, profilePath }: Props) => {
  return (
    <Card wrapperStyle={tailwind('w-40')} containerStyle={tailwind('p-0 m-1')}>
      <Card.Image source={{ uri: profilePath }} resizeMethod={'scale'} />
      <Text style={tailwind('text-center font-bold')}>{name}</Text>
      <Text style={tailwind('text-center')}>{character}</Text>
    </Card>
  );
};

export default MovieCastItem;
