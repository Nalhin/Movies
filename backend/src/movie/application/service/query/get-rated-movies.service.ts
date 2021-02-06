import { Inject, Injectable } from '@nestjs/common';
import { GetRatedMoviesUseCase } from '../../port/in/query/get-rated-movies-use.case';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-model/paginated.read-model';
import { MovieListReadModel } from '../../../domain/read-model/movie-list.read-model';
import {
  GET_RATED_MOVIES_PORT,
  GetRatedMoviesPort,
} from '../../port/out/get-rated-movies.port';

@Injectable()
export class GetRatedMoviesService implements GetRatedMoviesUseCase {
  constructor(
    @Inject(GET_RATED_MOVIES_PORT)
    private readonly getRated: GetRatedMoviesPort,
  ) {}

  getRatedMovies(
    page: number,
    userId: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>> {
    return this.getRated.getRatedMovies(page, userId);
  }
}
