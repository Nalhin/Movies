import { Movie } from '../../../domain/movie.domain';
import { Observable } from 'rxjs';

export interface GetMovieDetailsPort {
  getMovieById(id: number): Observable<Movie>;
}
