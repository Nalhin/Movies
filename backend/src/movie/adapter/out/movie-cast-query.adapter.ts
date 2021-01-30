import { Injectable } from '@nestjs/common';
import { GetMovieCastPort } from '../../application/port/out/get-movie-cast.port';
import { TmdbClientService } from './http/tmdb-movie/tmdb-client.service';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { MovieCastReadModel } from '../../domain/read-model/movie-cast.read-model';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieCastQueryAdapter implements GetMovieCastPort {
  constructor(private readonly movieClient: TmdbClientService) {}

  getMovieCast(movieId: number): Promise<O.Option<MovieCastReadModel[]>> {
    return this.movieClient
      .getMovieCast(movieId)
      .pipe(
        map((castResponse) =>
          pipe(
            castResponse,
            O.map((castList) =>
              castList.map(
                (cast) =>
                  new MovieCastReadModel(
                    cast.id,
                    cast.name,
                    cast.character,
                    String(cast.profilePath),
                  ),
              ),
            ),
          ),
        ),
      )
      .toPromise();
  }
}
