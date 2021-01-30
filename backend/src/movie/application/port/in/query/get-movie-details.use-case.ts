import { MovieDetailsReadModel } from '../../../../domain/read-model/movie-details.read-model';
import * as O from 'fp-ts/Option';

export interface GetMovieDetailsUseCase {
  getMovieDetails(
    movieId: number,
    userId: number,
  ): Promise<O.Option<MovieDetailsReadModel>>;
}

export const GET_MOVIE_DETAILS_USE_CASE = Symbol('GET_MOVIE_DETAILS_USE_CASE');
