import {
  GET_MOVIE_CAST_USE_CASE,
  GetMovieCastUseCase,
} from '../../../application/port/in/query/get-movie-cast.use-case';
import { Inject } from '@nestjs/common/decorators/core';
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MovieCastListResponseDto } from './dto/response/movie-cast-list-response.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Id } from '../../../../common/params/id';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

@Controller()
@ApiTags('movie')
export class MovieCastController {
  constructor(
    @Inject(GET_MOVIE_CAST_USE_CASE)
    private readonly getMovieCastUseCase: GetMovieCastUseCase,
  ) {}

  @Get('/movies/:id/cast')
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  async getMovieCast(
    @Id() movieId: number,
  ): Promise<MovieCastListResponseDto[]> {
    return pipe(
      await this.getMovieCastUseCase.getMovieCast(movieId),
      O.map((cast) => plainToClass(MovieCastListResponseDto, cast)),
      O.getOrElse(() => {
        throw new NotFoundException('Movie not found');
      }),
    );
  }
}
