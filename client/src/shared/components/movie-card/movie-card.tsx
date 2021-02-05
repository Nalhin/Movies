import React from 'react';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  posterPath: string;
  onPress: () => void;
}

const MovieCard: React.FC<Props> = ({ title, posterPath, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Image source={{ uri: posterPath }} />
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;
