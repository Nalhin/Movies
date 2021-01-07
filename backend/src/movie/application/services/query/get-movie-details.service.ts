import { Inject, Injectable } from '@nestjs/common';
import {
  GET_MOVIE_DETAILS,
  GetMovieDetailsPort,
} from '../../port/out/get-movie-details.port';
import { GetMovieDetailsUseCase } from '../../port/in/query/get-movie-details.use-case';
import { Movie } from '../../../domain/movie.domain-model';

@Injectable()
export class GetMovieDetailsService implements GetMovieDetailsUseCase {
  constructor(
    @Inject(GET_MOVIE_DETAILS)
    private readonly movieDetailsProvider: GetMovieDetailsPort,
  ) {}

  getMovieDetails(movieId: number, userId: number): Promise<Movie> {
    return this.movieDetailsProvider.getMovieById(movieId);
  }
}
