import { Inject, Injectable } from '@nestjs/common';
import { GetPopularMoviesUseCase } from '../../port/in/query/get-popular-movies.use-case';
import {
  GET_POPULAR_MOVIES_PORT,
  GetPopularMoviesPort,
} from '../../port/out/get-popular-movies.port';
import { MovieListReadModel } from '../../../domain/read-model/movie-list.read-model';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-model/paginated.read-model';

@Injectable()
export class GetPopularMoviesService implements GetPopularMoviesUseCase {
  constructor(
    @Inject(GET_POPULAR_MOVIES_PORT)
    private readonly getPopular: GetPopularMoviesPort,
  ) {}

  getPopularMovies(
    page: number,
    userId?: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>> {
    return this.getPopular.getPopularMovies(page, userId);
  }
}
