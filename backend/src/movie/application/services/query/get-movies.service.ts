import { Inject, Injectable } from '@nestjs/common';
import { MovieListReadModel } from 'src/movie/domain/read-models/movie-list.read-model';
import { GetMoviesUseCase } from '../../port/in/query/get-movies-use-case';
import { GET_MOVIES, GetMoviesPort } from '../../port/out/get-movies.port';

@Injectable()
export class GetMoviesService implements GetMoviesUseCase {
  constructor(
    @Inject(GET_MOVIES)
    private readonly moviesProvider: GetMoviesPort,
  ) {}

  getMovies(
    search: string,
    page: number,
    userId: number,
  ): Promise<MovieListReadModel[]> {
    return this.moviesProvider.getMovies(search, page, userId);
  }
}
