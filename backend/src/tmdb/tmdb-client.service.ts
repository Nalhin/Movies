import { HttpService, Injectable } from '@nestjs/common';
import { MovieSearchResponse } from './models/movie-search-response';
import { map } from 'rxjs/operators';
import { MovieDetailsResponse } from './models/movie-details-response';
import { Observable } from 'rxjs';

@Injectable()
export class TmdbClientService {
  constructor(private readonly httpService: HttpService) {}

  searchMovies(query: string): Observable<MovieSearchResponse> {
    return this.httpService
      .get<MovieSearchResponse>('/search/movie', {
        params: { query },
      })
      .pipe(map((resp) => resp.data));
  }

  getById(movieId: number): Observable<MovieDetailsResponse> {
    return this.httpService
      .get<MovieDetailsResponse>(`/movie/${movieId}`)
      .pipe(map((resp) => resp.data));
  }
}
