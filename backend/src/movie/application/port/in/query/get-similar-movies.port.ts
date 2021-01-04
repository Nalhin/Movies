import { IQueryHandler } from '@nestjs/cqrs';
import { GetSimilarMoviesQuery } from '../../../query/get-similar-movies/get-similar-movies.query';

export type GetSimilarMoviesPort = IQueryHandler<GetSimilarMoviesQuery, void>;
