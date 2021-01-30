import * as O from 'fp-ts/Option';

export interface GetPlotDetailsPort {
  getPlotDetails(imdbId: string, title: string): Promise<O.Option<string>>;
}

export const GET_PLOT_DETAILS_PORT = Symbol('GET_PLOT_DETAILS_PORT');
