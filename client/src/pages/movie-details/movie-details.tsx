import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMovieById } from '../../core/api/movie/movie.api';
import { Button, Icon, Image } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { MovieDetailsRouteProps, ROOT_ROUTES } from '../root.routes';
import PlotQuestionModal from './plot-question-modal/plot-question-modal';
import { useToggle } from '../../shared/hooks/use-toggle';
import { useUser } from '../../shared/context/auth/use-user/use-user';
import {
  deleteMovieFavourite,
  postMovieFavourite,
} from '../../core/api/movie/movie-favourite.api';
import {
  deleteMovieRating,
  postMovieRating,
} from '../../core/api/movie/movie-rating.api';
import MovieCast from './movie-cast/movie-cast';
import { format } from 'date-fns';
import MovieRating from './movie-rating/movie-rating';
import MovieStats from './movie-stats/movie-stats';
import SimilarMovies from './similar-movies/similar-movies';

const MovieDetails = () => {
  const navigation = useNavigation();
  const {
    params: { movieId },
  } = useRoute<MovieDetailsRouteProps>();
  const { data: movie, refetch } = useQuery(
    ['movieDetails', movieId],
    () => getMovieById(movieId),
    { select: (resp) => resp.data },
  );
  const toggle = useToggle(false);
  const user = useUser();

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
        <Text style={tailwind('text-2xl font-bold text-center mb-2')}>
          {movie.title} ({format(new Date(movie.releaseDate), 'yyyy')})
        </Text>
        <Image
          source={{ uri: movie.posterPath ?? undefined }}
          style={{ height: 500 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={tailwind('mx-1')}>
          <MovieCast movieId={movieId} />
          <PlotQuestionModal
            isOpen={toggle.isOpen}
            onClose={toggle.close}
            movieId={movieId}
          />
          <Text style={tailwind('font-bold text-lg text-center')}>
            Overview
          </Text>
          <Text style={tailwind('text-sm text-center')}>{movie.overview}</Text>
          <MovieStats
            budget={movie.budget}
            revenue={movie.revenue}
            releaseDate={movie.releaseDate}
            runtime={movie.runtime}
          />
        </View>
        <SimilarMovies
          movieId={movieId}
          onMoviePress={(pressedId) =>
            navigation.navigate(ROOT_ROUTES.MOVIE_DETAILS, {
              movieId: pressedId,
            })
          }
        />
        <MovieRating
          userRating={movie.userRating}
          rateMovie={rateMovie}
          averageRating={movie.averageRating}
        />
        <Button
          title="Ask a plot question"
          onPress={toggle.open}
          style={tailwind('mt-2 mx-8')}
        />
      </ScrollView>
      {user.isAuthenticated && (
        <View style={tailwind('absolute bottom-2 right-2')}>
          <Icon
            reverse
            name={movie.isFavourite ? 'heart-broken' : 'heart'}
            type="font-awesome-5"
            color="#EF4444"
            solid
            onPress={() =>
              movie.isFavourite ? removeFavourite() : setFavourite()
            }
          />
        </View>
      )}
      {movie.userRating && (
        <View style={tailwind('absolute bottom-2 left-2')}>
          <Icon
            reverse
            name="eraser"
            type="font-awesome-5"
            color="#FBBF24"
            solid
            onPress={() => removeRating()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MovieDetails;
