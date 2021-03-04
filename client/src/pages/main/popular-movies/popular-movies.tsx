import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { getPopularMoviesPage } from '../../../core/api/movie/movie.api';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROOT_ROUTES } from '../../root.routes';

const PopularMovies = () => {
  const navigation = useNavigation();
  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    'popularMovies',
    async ({ pageParam = 1 }) => {
      return getPopularMoviesPage(pageParam).then((resp) => resp.data);
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    },
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <SafeAreaView>
      <FlatList
        testID="popular-movies-list"
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
