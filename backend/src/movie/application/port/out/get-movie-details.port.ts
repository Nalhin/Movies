import { Movie } from '../../../domain/movie.domain-model';

export interface GetMovieDetailsPort {
  getMovieById(id: number): Promise<Movie>;
}

export const GET_MOVIE_DETAILS = Symbol('GET_MOVE_DETAILS');
