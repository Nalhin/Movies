import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { RateMovieRequestDto } from './dto/rate-movie-request.dto';
import { AuthRequired } from '../common/decorators/auth-required.decorator';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/movies/:id')
  getMovieById(@Param('id') id: number) {
    return this.movieService
      .getMovieById(id)
      .pipe(map((movie) => plainToClass(MovieDetailsResponseDto, movie)));
  }

  @Get('/movies')
  getMovies(@Query('page') page: number, @Query('search') search: string) {
    return this.movieService
      .getMovies(search, page)
      .pipe(map((movies) => plainToClass(MovieResponseDto, movies.results)));
  }

  @AuthRequired()
  @Post('/movies/:id/rating')
  rateMovie(@Param('id') id: number, @Body() rateMovie: RateMovieRequestDto) {
    return null;
  }

  @AuthRequired()
  @Delete('/movies/:id/rating')
  deleteRating(@Param('id') id: number) {
    return null;
  }

  @AuthRequired()
  @Post('/movies/:id/favourite')
  addFavourite(@Param('id') id: number) {
    return null;
  }

  @AuthRequired()
  @Delete('/movies/:id/favourite')
  removeFavorite(@Param('id') id: number) {
    return null;
  }

  @Get('/movies/:id/plot-question')
  askPlotQuestion(
    @Param('id') id: number,
    @Query('question') question: string,
  ) {
    return this.movieService.answerQuestion(id, question);
  }

  @Get('/movies/:id/cast')
  getMovieCast(@Param('id') id: number) {
    return null;
  }

  @Get('/movies/:id/similar')
  getSimilarMovies(@Param('id') id: number) {
    return null;
  }
}
