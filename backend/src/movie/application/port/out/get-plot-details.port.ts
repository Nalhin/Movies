import { Observable } from 'rxjs';

export interface GetPlotDetailsPort {
  getPlotDetails(imdbId: string, title: string): Observable<string>;
}

export const GET_PLOT_DETAILS = Symbol('GET_PLOT_DETAILS');
