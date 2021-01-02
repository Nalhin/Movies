import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import { MovieResponseDto } from './dto/movie-response.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/:id')
  getMovieById(@Param('id') id: number) {
    return this.movieService
      .getMovieById(id)
      .pipe(map((movie) => plainToClass(MovieDetailsResponseDto, movie)));
  }

  @Get('')
  getMovies(@Query('page') page: number, @Query('search') search: string) {
    return this.movieService
      .getMovies(search, page)
      .pipe(map((movies) => plainToClass(MovieResponseDto, movies.results)));
  }

  @Get('/:id/answer-question')
  answerQuestion(@Param('id') id: number, @Query('question') question: string) {
    return this.movieService.answerQuestion(id, question);
  }
}
