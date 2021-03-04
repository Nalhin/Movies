import React, { useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { getSearchMoviesPage } from '../../../core/api/movie/movie.api';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { ROOT_ROUTES } from '../../root.routes';
import { useDebounce } from 'use-debounce';
import { Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';

const SearchMovies = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQuery(
    ['searchMovies', debouncedSearch],
    async ({ pageParam = 1 }) => {
      return getSearchMoviesPage(pageParam, debouncedSearch).then(
        (resp) => resp.data,
      );
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
      enabled: !!debouncedSearch,
    },
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <SafeAreaView>
      <Input
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder={'Search...'}
      />
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
      {isLoading && (
        <View
          style={tailwind(
            'absolute w-96 h-96 flex justify-center items-center',
          )}
          pointerEvents="none"
        >
          <ActivityIndicator size={'large'} testID="loader" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchMovies;
