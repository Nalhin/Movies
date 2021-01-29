import { Inject, Injectable } from '@nestjs/common';
import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';
import { GetSimilarMoviesUseCase } from '../../port/in/query/get-similar-movies.use-case';
import {
  GET_SIMILAR_MOVIES_PORT,
  GetSimilarMoviesPort,
} from '../../port/out/get-similar-movies.port';
import * as O from 'fp-ts/Option';

@Injectable()
export class GetSimilarMoviesService implements GetSimilarMoviesUseCase {
  constructor(
    @Inject(GET_SIMILAR_MOVIES_PORT)
    private readonly getSimilar: GetSimilarMoviesPort,
  ) {}

  getSimilarMovies(
    movieId: number,
    userId?: number,
  ): Promise<O.Option<MovieListReadModel[]>> {
    return this.getSimilar.getSimilarMovies(movieId, userId);
  }
}
