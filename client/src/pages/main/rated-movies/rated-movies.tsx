import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { FlatList, SafeAreaView } from 'react-native';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { ROOT_ROUTES } from '../../root.routes';
import React from 'react';
import { PaginatedMovieListResponseDto } from '../../../core/api/api.types';
import type { AxiosError } from 'axios';
import { getRatedMoviesPage } from '../../../core/api/movie/movie-rating.api';

const RatedMovies = () => {
  const navigation = useNavigation();
  const { data, fetchNextPage, refetch } = useInfiniteQuery<
    PaginatedMovieListResponseDto,
    AxiosError
  >(
    'ratedMovies',
    async ({ pageParam = 1 }) => {
      return getRatedMoviesPage(pageParam).then((resp) => resp.data);
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

export default RatedMovies;
