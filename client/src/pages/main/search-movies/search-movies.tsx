import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from 'react-query';
import { getSearchMoviesPage } from '../../../core/api/movie/movie.api';
import MovieCard from '../../../shared/components/movie-card/movie-card';
import { ROOT_ROUTES } from '../../root.routes';
import { useDebounce } from 'use-debounce';
import { Input } from 'react-native-elements';

const SearchMovies = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, fetchNextPage } = useInfiniteQuery(
    ['projects', debouncedSearch],
    async ({ pageParam = 1 }) => {
      return getSearchMoviesPage(pageParam, debouncedSearch).then(
        (resp) => resp.data,
      );
    },
    {
      getPreviousPageParam: (firstPage) =>
        firstPage.page > 1 ? firstPage.page - 1 : false,
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : false,
      enabled: !!debouncedSearch,
    },
  );

  return (
    <SafeAreaView>
      <Input onChangeText={(text) => setSearch(text)} value={search} />
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

export default SearchMovies;
