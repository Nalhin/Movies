import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getMovieCast } from '../../core/api/movie/movie-cast.api';
import { useQuery } from 'react-query';
import MovieCastCard from '../../shared/components/movie-cast-card/movie-cast-card';
import tailwind from 'tailwind-rn';

interface Props {
  movieId: number;
}

const MovieCast: React.FC<Props> = ({ movieId }) => {
  const { data } = useQuery(
    ['movieCast', movieId],
    () => getMovieCast(movieId),
    { select: (resp) => resp.data },
  );

  return (
    <View>
      <Text style={tailwind('font-bold text-lg text-center')}>Cast</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieCastCard
            key={item.id}
            name={item.name}
            character={item.character}
            profilePath={item.profilePath}
          />
        )}
        horizontal
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

export default MovieCast;
