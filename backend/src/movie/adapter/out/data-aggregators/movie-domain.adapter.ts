import { FindMoviePort } from '../../../application/port/out/find-movie.port';
import { UpdateMoviePort } from '../../../application/port/out/update-movie.port';
import { Movie } from '../../../domain/model/movie.domain-model';
import { MovieRepository } from '../persistance/movie/movie.repository';
import { MovieRatingRepository } from '../persistance/movie-rating/movie-rating.repository';
import { Injectable } from '@nestjs/common';
import { TmdbClientService } from '../movie-data/tmdb-movie-data/tmdb-client.service';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { MovieFavouriteByUserRepository } from '../persistance/movie-favourite-by-user/movie-favourite-by-user.repository';

@Injectable()
export class MovieDomainAdapter implements FindMoviePort, UpdateMoviePort {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly ratingRepository: MovieRatingRepository,
    private readonly mfbuRepository: MovieFavouriteByUserRepository,
    private readonly movieRating: MovieRatingRepository,
    private readonly movieClient: TmdbClientService,
  ) {}

  async findById(movieId: number, userId: number): Promise<O.Option<Movie>> {
    const [movieExternal, moviePersisted] = await Promise.all([
      this.movieClient.getMovieById(movieId).toPromise(),
      this.movieRepository.getMovieDetails(movieId, userId),
    ]);

    return pipe(
      movieExternal,
      O.map(
        (movie) =>
          new Movie(
            movie.id,
            movie.imdbId,
            movie.title,
            moviePersisted.userRating,
            moviePersisted.isFavourite,
          ),
      ),
    );
  }

  async updateMovie(movie: Movie, userId: number): Promise<void> {
    const movieToSave = this.movieRepository.create({
      id: movie.id,
      imdbId: movie.imdbId,
    });
    await this.movieRepository.save(movieToSave);

    const rating = await this.movieRating.findOne({
      author: { id: userId },
      movie: { id: movie.id },
    });

    if (movie.userRating && !rating) {
      await this.ratingRepository.save({
        ...rating,
        rating: movie.userRating,
        author: { id: userId },
        movie: { id: movie.id },
      });
    }

    if (!movie.userRating && rating) {
      await this.ratingRepository.remove(rating);
    }

    const favourite = await this.mfbuRepository.findOne({
      movie: { id: movie.id },
      author: {
        id: userId,
      },
    });

    if (!movie.isFavourite && favourite) {
      await this.mfbuRepository.remove(favourite);
    }

    if (movie.isFavourite && !favourite) {
      await this.mfbuRepository.save({
        ...favourite,
        movie: { id: movie.id },
        author: { id: userId },
      });
    }
  }
}
