import { Injectable } from '@nestjs/common';
import { TmdbClientService } from '../tmdb/tmdb-client.service';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbClient: TmdbClientService) {}

  getMovieById(id: number) {
    return this.tmdbClient.getMovieById(id);
  }

  getMovies(search: string, page: number) {
    return this.tmdbClient.searchMovies(search, page);
  }
}
