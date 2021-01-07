export interface MovieDetailsResponse {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  spokenLanguages: SpokenLanguage[];
  status: MovieStatus;
  tagline: string | null;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso31661: string;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logoPath: string | null;
  originCountry: string;
}

export interface SpokenLanguage {
  iso6391: string;
  name: string;
}

export type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';
