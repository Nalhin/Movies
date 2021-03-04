import React from 'react';
import { useQuery } from 'react-query';
import { getSimilarMovies } from '../../../core/api/movie/movie.api';
import { FlatList, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import MovieCardSmall from '../../../shared/components/movie-card/movie-card-small';

interface Props {
  movieId: number;
  onMoviePress: (movieId: number) => void;
}

const SimilarMovies = ({ movieId, onMoviePress }: Props) => {
  const { data, isLoading } = useQuery(
    ['similarMovies', movieId],
    () => getSimilarMovies(movieId),
    { select: (resp) => resp.data },
  );

  if (isLoading) {
    return null;
  }

  return (
    <View style={tailwind('mt-2')}>
      <Text style={tailwind('font-bold text-lg text-center mb-1')}>
        Similar movies
      </Text>
      <FlatList
        data={data}
        ListEmptyComponent={
          <Text style={tailwind('text-sm text-center w-96')}>
            No similar movies found
          </Text>
        }
        renderItem={({ item }) => (
          <MovieCardSmall
            title={item.title}
            posterPath={item.posterPath}
            onPress={() => onMoviePress(item.id)}
          />
        )}
        horizontal
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

export default SimilarMovies;
