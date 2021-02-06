import { Inject, Injectable } from '@nestjs/common';
import * as O from 'fp-ts/Option';
import { PaginatedReadModel } from '../../../domain/read-model/paginated.read-model';
import { MovieListReadModel } from '../../../domain/read-model/movie-list.read-model';
import {
  GET_FAVOURITE_MOVIES_PORT,
  GetFavouriteMoviesPort,
} from '../../port/out/get-favourite-movies.port';
import { GetFavouriteMoviesUseCase } from '../../port/in/query/get-favourite-movies.use-case';

@Injectable()
export class GetFavouriteMoviesService implements GetFavouriteMoviesUseCase {
  constructor(
    @Inject(GET_FAVOURITE_MOVIES_PORT)
    private readonly getFavourite: GetFavouriteMoviesPort,
  ) {}

  getFavouriteMovies(
    page: number,
    userId: number,
  ): Promise<O.Option<PaginatedReadModel<MovieListReadModel[]>>> {
    return this.getFavourite.getFavouriteMovies(page, userId);
  }
}
