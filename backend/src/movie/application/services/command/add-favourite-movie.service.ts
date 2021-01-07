import { Inject, Injectable } from '@nestjs/common';
import { LOAD_MOVIE_PORT, LoadMoviePort } from '../../port/out/load-movie.port';
import {
  UPDATE_MOVIE_PORT,
  UpdateMoviePort,
} from '../../port/out/update-movie.port';
import { AddFavouriteMovieUseCase } from '../../port/in/command/add-favourite-movie.use-case';

@Injectable()
export class AddFavouriteMovieService implements AddFavouriteMovieUseCase {
  constructor(
    @Inject(LOAD_MOVIE_PORT)
    private readonly loadMoviePort: LoadMoviePort,
    @Inject(UPDATE_MOVIE_PORT)
    private readonly updateMoviePort: UpdateMoviePort,
  ) {}

  async addFavourite(movieId: number, userId: number): Promise<void> {
    const movie = await this.loadMoviePort.loadById(movieId, userId);
    await this.updateMoviePort.updateMovie(movie.markAsFavourite(), userId);
  }
}
