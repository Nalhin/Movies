import { Observable } from 'rxjs';

export interface PlotDetailsAdapter {
  getPlotDetails(imdbId: string, title: string): Observable<string>;
}
