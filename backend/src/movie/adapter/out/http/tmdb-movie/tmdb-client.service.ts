import { HttpService, Injectable } from '@nestjs/common';
import { MovieListResponseDto } from './dto/movie-list-response.dto';
import { catchError, map } from 'rxjs/operators';
import { MovieDetailsResponseDto } from './dto/movie-details-response.dto';
import { Observable, of } from 'rxjs';
import { MovieCastResponseDto } from './dto/movie-cast-response.dto';
import * as O from 'fp-ts/Option';

@Injectable()
export class TmdbClientService {
  constructor(private readonly httpService: HttpService) {}

  queryMovies(query: string, page: number): Observable<MovieListResponseDto> {
    return this.httpService
      .get<MovieListResponseDto>('/search/movie', {
        params: { query, page },
      })
      .pipe(map((resp) => resp.data));
  }

  getMovieById(movieId: number): Observable<O.Option<MovieDetailsResponseDto>> {
    return this.httpService
      .get<MovieDetailsResponseDto>(`/movie/${movieId}`)
      .pipe(
        map((resp) => O.some(resp.data)),
        catchError(() => of(O.none)),
      );
  }

  getSimilarMovies(movieId: number): Observable<MovieListResponseDto> {
    return this.httpService
      .get<MovieListResponseDto>(`/movie/${movieId}/similar`)
      .pipe(map((resp) => resp.data));
  }

  getPopularMovies(): Observable<MovieListResponseDto> {
    return this.httpService
      .get<MovieListResponseDto>(`/movie/popular`)
      .pipe(map((resp) => resp.data));
  }

  getMovieCast(movieId: number): Observable<MovieCastResponseDto[]> {
    return this.httpService
      .get<{ cast: MovieCastResponseDto[] }>(`/movie/${movieId}/credits`)
      .pipe(map((resp) => resp.data.cast));
  }
}
