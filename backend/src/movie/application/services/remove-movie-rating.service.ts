import { Inject, Injectable } from '@nestjs/common';
import { RateMovieUseCase } from '../port/in/rate-movie.use-case';
import { LOAD_MOVIE_PORT, LoadMoviePort } from '../port/out/load-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../port/out/update-movie.port';

@Injectable()
export class RemoveMovieRatingService implements RateMovieUseCase {
  constructor(
    @Inject(LOAD_MOVIE_PORT)
    private readonly loadMoviePort: LoadMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async rateMovie(
    movieId: number,
    score: number,
    userId: number,
  ): Promise<void> {
    const movie = await this.loadMoviePort.loadById(movieId, userId);
    if (movie.isAlreadyRated) {
      throw new Error();
    }
    movie.addUserRating(score);
    await this.updateMoviePort.updateMovie(movie, userId);
  }
}
