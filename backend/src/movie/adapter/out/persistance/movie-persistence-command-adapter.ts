import { LoadMoviePort } from '../../../application/port/out/load-movie.port';
import { UpdateMoviePort } from '../../../application/port/out/update-movie.port';
import { Movie } from '../../../domain/movie.domain-model';
import { MovieRepository } from './movie/movie.repository';
import { MovieRatingRepository } from './movie-rating/movie-rating.repository';
import { Injectable } from '@nestjs/common';
import { TmdbClientService } from '../http/tmdb-movie/tmdb-client.service';

@Injectable()
export class MovieCommandPersistenceAdapter
  implements LoadMoviePort, UpdateMoviePort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly ratingRepository: MovieRatingRepository,
    private readonly movieRating: MovieRatingRepository,
    private readonly movieClient: TmdbClientService,
  ) {}

  async loadById(movieId: number, userId: number): Promise<Movie> {
    const [movieExternal, moviePersisted] = await Promise.all([
      this.movieClient.getMovieById(movieId).toPromise(),
      this.movieRepository.getPersonalMovieDetails(movieId, userId),
    ]);

    return new Movie(
      movieExternal.id,
      movieExternal.imdbId,
      movieExternal.title,
      moviePersisted?.userRating ?? null,
      moviePersisted?.isFavourite ?? false,
    );
  }

  async updateMovie(movie: Movie, userId: number): Promise<void> {
    const movieToSave = this.movieRepository.create({
      id: movie.id,
      imdbId: movie.imdbId,
      favouriteBy: movie.isFavourite ? [{ id: userId }] : [],
    });
    await this.movieRepository.save(movieToSave);

    if (movie.userRating) {
      const rating = await this.movieRating.findOne({
        author: { id: userId },
        movie: { id: movie.id },
      });
      await this.ratingRepository.save({
        ...rating,
        rating: movie.userRating,
        author: { id: userId },
        movie: { id: movie.id },
      });
    }
  }
}
