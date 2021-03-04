import React from 'react';
import { AirbnbRating } from 'react-native-elements';
import { View, Text } from 'react-native';
import { useUser } from '../../../shared/context/auth/use-user/use-user';
import tailwind from 'tailwind-rn';

interface Props {
  rateMovie: (rating: number) => void;
  userRating: number | null;
  averageRating: number | null;
}

const MovieRating = ({ rateMovie, userRating, averageRating }: Props) => {
  const user = useUser();
  return (
    <View style={tailwind('my-1')}>
      {user.isAuthenticated && (
        <>
          <Text style={tailwind('font-bold text-lg text-center')}>
            Your rating
          </Text>
          <AirbnbRating
            showRating={false}
            count={10}
            defaultRating={userRating ?? 0}
            isDisabled={!!userRating}
            size={20}
            onFinishRating={(rating) => rateMovie(rating)}
          />
        </>
      )}
      <>
        <Text style={tailwind('font-bold text-lg text-center')}>
          Average rating
        </Text>
        <AirbnbRating
          showRating={false}
          count={10}
          defaultRating={averageRating ?? 0}
          isDisabled
          size={20}
        />
      </>
    </View>
  );
};

export default MovieRating;
