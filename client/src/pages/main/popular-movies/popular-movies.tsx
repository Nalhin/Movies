import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { getPopularMoviesPage } from '../../../core/api/movie/movie.api';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { useNavigation } from '@react-navigation/native';
import { ROOT_ROUTES } from '../../root.routes';

const PopularMovies = () => {
  const navigation = useNavigation();
  const { data, fetchNextPage } = useInfiniteQuery(
    'popularMovies',
    async ({ pageParam = 1 }) => {
      return getPopularMoviesPage(pageParam).then((resp) => resp.data);
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    },
  );

  return (
    <SafeAreaView>
      <FlatList
        data={data?.pages.flatMap((page) => page.data)}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            posterPath={item.posterPath}
            onPress={() =>
              navigation.navigate(ROOT_ROUTES.MOVIE_DETAILS, {
                movieId: item.id,
              })
            }
            isFavourite={item.isFavourite}
            userRating={item.userRating}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        onEndReached={() => fetchNextPage()}
      />
    </SafeAreaView>
  );
};

export default PopularMovies;
