import { Observable } from 'rxjs';

export interface GetPlotDetailsPort {
  getPlotDetails(imdbId: string, title: string): Observable<string>;
}
