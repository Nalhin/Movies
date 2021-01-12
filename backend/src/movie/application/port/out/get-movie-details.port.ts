import { MovieDetailsReadModel } from '../../../domain/movie-details.read-model';

export interface GetMovieDetailsPort {
  getMovieById(id: number, userId?: number): Promise<MovieDetailsReadModel>;
}

export const GET_MOVIE_DETAILS = Symbol('GET_MOVIE_DETAILS');
