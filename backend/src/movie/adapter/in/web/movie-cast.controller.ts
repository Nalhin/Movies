import {
  GET_MOVIE_CAST_USE_CASE,
  GetMovieCastUseCase,
} from '../../../application/port/in/query/get-movie-cast.use-case';
import { Inject } from '@nestjs/common/decorators/core';
import { Controller, Get, Param } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MovieCastListResponseDto } from './dto/movie-cast-list-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('movie')
export class MovieCastController {
  constructor(
    @Inject(GET_MOVIE_CAST_USE_CASE)
    private readonly getMovieCastUseCase: GetMovieCastUseCase,
  ) {}

  @Get('/movies/:id/cast')
  async getMovieCast(@Param('id') movieId: number) {
    return plainToClass(
      MovieCastListResponseDto,
      this.getMovieCastUseCase.getMovieCast(movieId),
    );
  }
}
