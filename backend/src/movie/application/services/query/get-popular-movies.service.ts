import { Inject, Injectable } from '@nestjs/common';
import { GetPopularMoviesUseCase } from '../../port/in/query/get-popular-movies.use-case';
import {
  GET_POPULAR_MOVIES_PORT,
  GetPopularMoviesPort,
} from '../../port/out/get-popular-movies.port';
import { MovieListReadModel } from '../../../domain/read-models/movie-list.read-model';

@Injectable()
export class GetPopularMoviesService implements GetPopularMoviesUseCase {
  constructor(
    @Inject(GET_POPULAR_MOVIES_PORT)
    private readonly getPopular: GetPopularMoviesPort,
  ) {}

  getPopularMovies(userId?: number): Promise<MovieListReadModel[]> {
    return this.getPopular.getPopularMovies(userId);
  }
}
