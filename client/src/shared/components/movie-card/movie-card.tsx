import React from 'react';
import { Card, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  posterPath: string;
  isFavourite: boolean;
  userRating: number;
  onPress: () => void;
}

const MovieCard: React.FC<Props> = ({
  title,
  posterPath,
  isFavourite,
  userRating,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Image source={{ uri: posterPath }} style={{ height: 500 }} />
        {isFavourite && (
          <Icon reverse name={'heart'} type="font-awesome-5" color="#517fa4" />
        )}
        {userRating && (
          <Icon reverse name={'star'} type="font-awesome-5" color="#517fa4" />
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;
