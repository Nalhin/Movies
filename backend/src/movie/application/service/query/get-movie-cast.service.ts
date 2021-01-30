import { Inject, Injectable } from '@nestjs/common';
import { GetMovieCastUseCase } from '../../port/in/query/get-movie-cast.use-case';
import {
  GetMovieCastPort,
  GET_MOVIE_CAST_PORT,
} from '../../port/out/get-movie-cast.port';
import { MovieCastReadModel } from '../../../domain/read-model/movie-cast.read-model';
import * as O from 'fp-ts/Option';

@Injectable()
export class GetMovieCastService implements GetMovieCastUseCase {
  constructor(
    @Inject(GET_MOVIE_CAST_PORT)
    private readonly getCast: GetMovieCastPort,
  ) {}

  getMovieCast(movieId: number): Promise<O.Option<MovieCastReadModel[]>> {
    return this.getCast.getMovieCast(movieId);
  }
}
