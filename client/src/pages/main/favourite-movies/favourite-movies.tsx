import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { FlatList, SafeAreaView } from 'react-native';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { ROOT_ROUTES } from '../../root.routes';
import { getFavouriteMoviesPage } from '../../../core/api/movie/movie-favourite.api';

const FavouriteMovies = () => {
  const navigation = useNavigation();
  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    'favouriteMovies',
    async ({ pageParam = 1 }) => {
      return getFavouriteMoviesPage(pageParam).then((resp) => resp.data);
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

export default FavouriteMovies;
