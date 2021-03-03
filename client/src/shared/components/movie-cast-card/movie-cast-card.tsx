import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import tailwind from 'tailwind-rn';

interface Props {
  name: string;
  character: string;
  profilePath: string;
}

const MovieCastCard = ({ name, character, profilePath }: Props) => {
  return (
    <Card wrapperStyle={tailwind('w-40')} containerStyle={tailwind('p-0 m-1')}>
      <Card.Image source={{ uri: profilePath }} resizeMethod={'scale'} />
      <Text style={tailwind('text-center font-bold mt-2')} numberOfLines={1}>
        {name}
      </Text>
      <Text style={tailwind('text-center')} numberOfLines={1}>
        {character}
      </Text>
    </Card>
  );
};

export default MovieCastCard;
