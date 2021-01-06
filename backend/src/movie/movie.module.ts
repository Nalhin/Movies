import { Module } from '@nestjs/common';
import { TmdbModule } from '../tmdb/tmdb.module';
import { QuestionAnsweringModule } from './adapter/out/machine-learning/question-answering/question-answering.module';
import { WikipediaPlotDetailsModule } from './adapter/out/http/wikipedia-plot-details/wikipedia-plot-details.module';
import { MovieRatingController } from './adapter/in/web/movie-rating.controller';
import { FavouriteMovieController } from './adapter/in/web/favourite-movie.controller';
import { ADD_FAVOURITE_MOVIE_USE_CASE } from './application/port/in/add-favourite-movie.use-case';
import { AddFavouriteMovieService } from './application/services/add-favourite-movie.service';
import { REMOVE_FAVOURITE_MOVIE_USE_CASE } from './application/port/in/remove-favourite-movie.use-case';
import { RemoveFavouriteMovieService } from './application/services/remove-favourite-movie.service';
import { RATE_MOVIE_USE_CASE } from './application/port/in/rate-movie.use-case';
import { RateMovieService } from './application/services/rate-movie.service';
import { RemoveMovieRatingService } from './application/services/remove-movie-rating.service';
import { REMOVE_MOVIE_RATING_USE_CASE } from './application/port/in/remove-movie-rating.use-case';
import { LOAD_MOVIE_PORT } from './application/port/out/load-movie.port';
import { MoviePersistenceAdapter } from './adapter/out/persistance/movie-persistence.adapter';
import { UPDATE_MOVIE_PORT } from './application/port/out/update-movie.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRatingRepository } from './adapter/out/persistance/movie-rating/movie-rating.repository';
import { MovieRepository } from './adapter/out/persistance/movie/movie.repository';

@Module({
  imports: [
    TmdbModule,
    QuestionAnsweringModule,
    WikipediaPlotDetailsModule,
    TypeOrmModule.forFeature([MovieRepository, MovieRatingRepository]),
  ],
  controllers: [MovieRatingController, FavouriteMovieController],
  providers: [
    {
      provide: ADD_FAVOURITE_MOVIE_USE_CASE,
      useClass: AddFavouriteMovieService,
    },
    {
      provide: REMOVE_FAVOURITE_MOVIE_USE_CASE,
      useClass: RemoveFavouriteMovieService,
    },
    {
      provide: RATE_MOVIE_USE_CASE,
      useClass: RateMovieService,
    },
    {
      provide: REMOVE_MOVIE_RATING_USE_CASE,
      useClass: RemoveMovieRatingService,
    },
    {
      provide: LOAD_MOVIE_PORT,
      useClass: MoviePersistenceAdapter,
    },
    {
      provide: UPDATE_MOVIE_PORT,
      useClass: MoviePersistenceAdapter,
    },
  ],
})
export class MovieModule {}
