import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { getFavouriteMoviesPage } from '../../../core/api/movie/movie.api';
import { FlatList, SafeAreaView } from 'react-native';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { ROOT_ROUTES } from '../../root.routes';

const FavouriteMovies = () => {
  const navigation = useNavigation();
  const { data, fetchNextPage } = useInfiniteQuery(
    'favouriteMovies',
    async ({ pageParam = 1 }) => {
      return getFavouriteMoviesPage(pageParam).then((resp) => {
        console.log(resp.data);
        return resp.data;
      });
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
          />
        )}
        keyExtractor={(item) => String(item.id)}
        onEndReached={() => fetchNextPage()}
      />
    </SafeAreaView>
  );
};

export default FavouriteMovies;
