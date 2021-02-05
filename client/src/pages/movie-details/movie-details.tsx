import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useRoute } from '@react-navigation/native';
import {
  deleteMovieFavourite,
  deleteMovieRating,
  getMovieById,
  postMovieFavourite,
  postMovieRating,
} from '../../core/api/movie/movie.api';
import { AirbnbRating, Icon, Image } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { MovieDetailsRouteProps } from '../root.routes';

const MovieDetails = () => {
  const {
    params: { movieId },
  } = useRoute<MovieDetailsRouteProps>();
  const { data: movie, refetch } = useQuery(
    ['movieDetails', movieId],
    () => getMovieById(movieId),
    { select: (resp) => resp.data },
  );

  const { mutate: rateMovie } = useMutation(
    (rating: number) => postMovieRating({ rating }, movieId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );
  const { mutate: removeRating } = useMutation(
    () => deleteMovieRating(movieId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const { mutate: setFavourite } = useMutation(
    () => postMovieFavourite(movieId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );
  const { mutate: removeFavourite } = useMutation(
    () => deleteMovieFavourite(movieId),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  if (!movie) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <ScrollView style={tailwind('h-full')}>
        <Text style={tailwind('text-2xl font-bold text-center')}>
          {movie.title}
        </Text>
        <Image
          source={{ uri: movie.posterPath ?? undefined }}
          style={tailwind('w-full h-80')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={tailwind('text-center')}>Your rating</Text>
        <Text>{movie.overview}</Text>
        <AirbnbRating
          showRating={false}
          count={10}
          defaultRating={movie.userRating ?? 0}
          isDisabled={!!movie.userRating}
          size={20}
          onFinishRating={(rating) => rateMovie(rating)}
        />
      </ScrollView>
      <View style={tailwind('absolute bottom-2 right-2')}>
        <Icon
          reverse
          name={movie.isFavourite ? 'heart-broken' : 'heart'}
          type="font-awesome-5"
          color="#517fa4"
          onPress={() =>
            movie.isFavourite ? removeFavourite() : setFavourite()
          }
        />
      </View>
      {movie.userRating && (
        <View style={tailwind('absolute bottom-2 left-2')}>
          <Icon
            reverse
            name="eraser"
            type="font-awesome-5"
            color="#517fa4"
            onPress={() => removeRating()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MovieDetails;
