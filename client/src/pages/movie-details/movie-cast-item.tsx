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
    <Card wrapperStyle={tailwind('w-40')}>
      <Card.Title>{character}</Card.Title>
      <Text>{name}</Text>
      <Card.Image source={{ uri: profilePath }} resizeMethod={'scale'} />
    </Card>
  );
};

export default MovieCastItem;
