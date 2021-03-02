import React from 'react';
import { Card, Icon } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';

interface Props {
  title: string;
  posterPath: string;
  isFavourite: boolean;
  userRating: number | null;
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
          <View style={tailwind('absolute bottom-2 right-2')}>
            <Icon
              raised
              name={'heart'}
              type="font-awesome-5"
              color="red"
              solid
            />
          </View>
        )}
        {userRating && (
          <View style={tailwind('absolute bottom-2 left-2')}>
            <Icon
              name={'star'}
              type="font-awesome-5"
              color="#FCD34D"
              raised
              solid
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;
