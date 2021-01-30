import { Inject, Injectable } from '@nestjs/common';
import {
  GET_MOVIE_DETAILS,
  GetMovieDetailsPort,
} from '../../port/out/get-movie-details.port';
import { GetMovieDetailsUseCase } from '../../port/in/query/get-movie-details.use-case';
import { MovieDetailsReadModel } from '../../../domain/read-model/movie-details.read-model';
import * as O from 'fp-ts/Option';

@Injectable()
export class GetMovieDetailsService implements GetMovieDetailsUseCase {
  constructor(
    @Inject(GET_MOVIE_DETAILS)
    private readonly movieDetailsProvider: GetMovieDetailsPort,
  ) {}

  getMovieDetails(
    movieId: number,
    userId: number,
  ): Promise<O.Option<MovieDetailsReadModel>> {
    return this.movieDetailsProvider.getMovieById(movieId, userId);
  }
}
