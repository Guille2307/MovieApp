/* eslint-disable @typescript-eslint/naming-convention */
// Generated by https://quicktype.io

export interface RespuestaMDB {
  page: number;
  results: Pelicula[];
  total_pages: number;
  total_results: number;
}

export interface Pelicula {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Generated by https://quicktype.io

export interface PeliculaDetalle {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: null;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Generated by https://quicktype.io

export interface RespuestaCredits {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: Character;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Character {
  Bean = 'Bean',
  Empty = '',
  Ivy = 'Ivy',
}

export enum Department {
  Acting = 'Acting',
  Directing = 'Directing',
  Writing = 'Writing',
}