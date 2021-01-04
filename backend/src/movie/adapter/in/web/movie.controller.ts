import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { RateMovieRequestDto } from './dto/rate-movie-request.dto';
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMoviesQuery } from '../../../application/query/get-movies/get-movies.query';
import { User } from '../../../../user/user.entity';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { AddRatingCommand } from '../../../application/command/add-rating/add-rating.command';
import { AddFavouriteCommand } from '../../../application/command/add-favourite/add-favourite.command';
import { RemoveFavouriteCommand } from '../../../application/command/remove-favourite/remove-favourite.command';
import { AskPlotQuestionQuery } from '../../../application/query/ask-plot-question/ask-plot-question.query';
import { GetMovieCastQuery } from '../../../application/query/get-movie-cast/get-movie-cast.query';
import { GetSimilarMoviesQuery } from '../../../application/query/get-similar-movies/get-similar-movies.query';
import { GetMovieDetailsQuery } from '../../../application/query/get-movie-details/get-movie-details.query';

@Controller()
export class MovieController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/movies/:id')
  async getMovieById(@Param('id') id: number) {
    return plainToClass(
      MovieDetailsResponseDto,
      await this.queryBus.execute(new GetMovieDetailsQuery(id)),
    );
  }

  @Get('/movies')
  async getMovies(
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    return plainToClass(
      MovieResponseDto,
      await this.queryBus.execute(new GetMoviesQuery(page, search)),
    );
  }

  @AuthRequired()
  @Post('/movies/:id/rating')
  async rateMovie(
    @Param('id') id: number,
    @Body() rateMovie: RateMovieRequestDto,
    @CurrentUser() user: User,
  ) {
    return this.commandBus.execute(
      new AddRatingCommand(id, rateMovie.score, user.id),
    );
  }

  @AuthRequired()
  @Delete('/movies/:id/rating')
  async deleteRating(@Param('id') movieId: number, @CurrentUser() user: User) {
    return this.commandBus.execute(new RemoveRatingCommand(movieId, user.id));
  }

  @AuthRequired()
  @Post('/movies/:id/favourite')
  async addFavourite(@Param('id') movieId: number, @CurrentUser() user: User) {
    return this.commandBus.execute(new AddFavouriteCommand(movieId, user.id));
  }

  @AuthRequired()
  @Delete('/movies/:id/favourite')
  async removeFavorite(
    @Param('id') movieId: number,
    @CurrentUser() user: User,
  ) {
    return this.commandBus.execute(
      new RemoveFavouriteCommand(movieId, user.id),
    );
  }

  @Get('/movies/:id/plot-question')
  async askPlotQuestion(
    @Param('id') movieId: number,
    @Query('question') question: string,
  ) {
    return this.queryBus.execute(new AskPlotQuestionQuery(movieId, question));
  }

  @Get('/movies/:id/cast')
  async getMovieCast(@Param('id') movieId: number) {
    return this.queryBus.execute(new GetMovieCastQuery(movieId));
  }

  @Get('/movies/:id/similar')
  async getSimilarMovies(@Param('id') movieId: number) {
    return this.queryBus.execute(new GetSimilarMoviesQuery(movieId));
  }
}
