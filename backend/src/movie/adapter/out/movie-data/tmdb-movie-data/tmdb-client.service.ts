import { HttpService, Injectable } from '@nestjs/common';
import {
  MovieItemResponse,
  MovieListResponseDto,
} from './dto/movie-list-response.dto';
import { catchError, map } from 'rxjs/operators';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import { Observable, of } from 'rxjs';
import {
  MovieCastListResponseDto,
  MovieCastResponseDto,
} from './dto/movie-cast-list-response.dto';
import * as O from 'fp-ts/Option';

@Injectable()
export class TmdbClientService {
  constructor(private readonly httpService: HttpService) {}

  queryMovies(
    query: string,
    page: number,
  ): Observable<O.Option<MovieListResponseDto>> {
    return this.httpService
      .get<MovieListResponseDto>('/search/movie', {
        params: { query, page },
      })
      .pipe(
        map((resp) => O.some(resp.data)),
        catchError(() => of(O.none)),
      );
  }

  getMovieById(movieId: number): Observable<O.Option<MovieDetailsResponseDto>> {
    return this.httpService
      .get<MovieDetailsResponseDto>(`/movie/${movieId}`)
      .pipe(
        map((resp) => O.some(resp.data)),
        catchError(() => of(O.none)),
      );
  }

  getSimilarMovies(movieId: number): Observable<O.Option<MovieItemResponse[]>> {
    return this.httpService
      .get<MovieListResponseDto>(`/movie/${movieId}/similar`)
      .pipe(
        map((resp) => O.some(resp.data.results)),
        catchError(() => of(O.none)),
      );
  }

  getPopularMovies(page: number): Observable<O.Option<MovieListResponseDto>> {
    return this.httpService
      .get<MovieListResponseDto>(`/movie/popular`, { params: { page } })
      .pipe(
        map((resp) => O.some(resp.data)),
        catchError(() => of(O.none)),
      );
  }

  getMovieCast(
    movieId: number,
  ): Observable<O.Option<MovieCastListResponseDto[]>> {
    return this.httpService
      .get<MovieCastResponseDto>(`/movie/${movieId}/credits`)
      .pipe(
        map((resp) => O.some(resp.data.cast)),
        catchError(() => of(O.none)),
      );
  }
}
