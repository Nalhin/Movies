import { HttpModule, Module } from '@nestjs/common';
import { TmdbModule } from './adapter/out/http/tmdb-movie/tmdb.module';
import { QuestionAnsweringModule } from './adapter/out/machine-learning/question-answering/question-answering.module';
import { WikipediaPlotDetailsModule } from './adapter/out/http/wikipedia-plot-details/wikipedia-plot-details.module';
import { MovieRatingController } from './adapter/in/web/movie-rating.controller';
import { FavouriteMovieController } from './adapter/in/web/favourite-movie.controller';
import { ADD_FAVOURITE_MOVIE_USE_CASE } from './application/port/in/command/add-favourite-movie.use-case';
import { AddFavouriteMovieService } from './application/services/command/add-favourite-movie.service';
import { REMOVE_FAVOURITE_MOVIE_USE_CASE } from './application/port/in/command/remove-favourite-movie.use-case';
import { RemoveFavouriteMovieService } from './application/services/command/remove-favourite-movie.service';
import { RATE_MOVIE_USE_CASE } from './application/port/in/command/rate-movie.use-case';
import { RateMovieService } from './application/services/command/rate-movie.service';
import { RemoveMovieRatingService } from './application/services/command/remove-movie-rating.service';
import { REMOVE_MOVIE_RATING_USE_CASE } from './application/port/in/command/remove-movie-rating.use-case';
import { LOAD_MOVIE_PORT } from './application/port/out/load-movie.port';
import { MovieCommandAdapter } from './adapter/out/movie-command-adapter';
import { UPDATE_MOVIE_PORT } from './application/port/out/update-movie.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRatingRepository } from './adapter/out/persistance/movie-rating/movie-rating.repository';
import { MovieRepository } from './adapter/out/persistance/movie/movie.repository';
import { GET_PLOT_DETAILS } from './application/port/out/get-plot-details.port';
import { WikipediaPlotDetailsAdapter } from './adapter/out/http/wikipedia-plot-details/wikipedia-plot-details.adapter';
import { QUESTION_ANSWERING_PORT } from './application/port/out/question-answering.port';
import { QuestionAnsweringAdapter } from './adapter/out/machine-learning/question-answering/question-answering.adapter';
import { GET_MOVIES_USE_CASE } from './application/port/in/query/get-movies-use-case';
import { GetMoviesService } from './application/services/query/get-movies.service';
import { GET_MOVIES } from './application/port/out/get-movies.port';
import { MovieQueryAdapter } from './adapter/out/movie-query.adapter';
import { MovieController } from './adapter/in/web/movie.controller';
import { ASK_PLOT_QUESTION_USE_CASE } from './application/port/in/query/ask-plot-question.use-case';
import { AskPlotQuestionService } from './application/services/query/ask-plot-question.service';
import { GET_MOVIE_DETAILS } from './application/port/out/get-movie-details.port';
import { GET_MOVIE_DETAILS_USE_CASE } from './application/port/in/query/get-movie-details.use-case';
import { GetMovieDetailsService } from './application/services/query/get-movie-details.service';
import { GET_POPULAR_MOVIES_USE_CASE } from './application/port/in/query/get-popular-movies.use-case';
import { GetPopularMoviesService } from './application/services/query/get-popular-movies.service';
import { GET_SIMILAR_MOVIES_USE_CASE } from './application/port/in/query/get-similar-movies.use-case';
import { GetSimilarMoviesService } from './application/services/query/get-similar-movies.service';
import { GET_SIMILAR_MOVIES_PORT } from './application/port/out/get-similar-movies.port';
import { GET_POPULAR_MOVIES_PORT } from './application/port/out/get-popular-movies.port';
import { GET_MOVIE_CAST_USE_CASE } from './application/port/in/query/get-movie-cast.use-case';
import { GetMovieCastService } from './application/services/query/get-movie-cast.service';
import { GET_MOVIE_CAST_PORT } from './application/port/out/get-movie-cast.port';

@Module({
  imports: [
    HttpModule,
    TmdbModule,
    QuestionAnsweringModule,
    WikipediaPlotDetailsModule,
    TypeOrmModule.forFeature([MovieRepository, MovieRatingRepository]),
  ],
  controllers: [
    MovieRatingController,
    FavouriteMovieController,
    MovieController,
  ],
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
      useClass: MovieCommandAdapter,
    },
    {
      provide: UPDATE_MOVIE_PORT,
      useClass: MovieCommandAdapter,
    },
    {
      provide: GET_PLOT_DETAILS,
      useClass: WikipediaPlotDetailsAdapter,
    },
    {
      provide: QUESTION_ANSWERING_PORT,
      useClass: QuestionAnsweringAdapter,
    },
    {
      provide: ASK_PLOT_QUESTION_USE_CASE,
      useClass: AskPlotQuestionService,
    },
    {
      provide: GET_MOVIES_USE_CASE,
      useClass: GetMoviesService,
    },
    {
      provide: GET_MOVIES,
      useClass: MovieQueryAdapter,
    },
    {
      provide: GET_MOVIE_DETAILS_USE_CASE,
      useClass: GetMovieDetailsService,
    },
    {
      provide: GET_MOVIE_DETAILS,
      useClass: MovieQueryAdapter,
    },
    {
      provide: GET_POPULAR_MOVIES_USE_CASE,
      useClass: GetPopularMoviesService,
    },
    {
      provide: GET_POPULAR_MOVIES_PORT,
      useClass: MovieQueryAdapter,
    },
    {
      provide: GET_SIMILAR_MOVIES_USE_CASE,
      useClass: GetSimilarMoviesService,
    },
    {
      provide: GET_SIMILAR_MOVIES_PORT,
      useClass: MovieQueryAdapter,
    },
    {
      provide: GET_MOVIE_CAST_USE_CASE,
      useClass: GetMovieCastService,
    },
    {
      provide: GET_MOVIE_CAST_PORT,
      useClass: MovieQueryAdapter,
    },
  ],
})
export class MovieModule {}
