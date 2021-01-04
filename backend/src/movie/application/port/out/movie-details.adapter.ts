import { Movie } from '../../../domain/movie.domain';
import { Observable } from 'rxjs';

export interface MovieDetailsAdapter {
  getMovieById(id: number): Observable<Movie>;
}
