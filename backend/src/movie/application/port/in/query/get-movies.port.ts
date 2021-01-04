import { IQueryHandler } from '@nestjs/cqrs';
import { GetMoviesQuery } from '../../../query/get-movies/get-movies.query';

export type GetMoviesPort = IQueryHandler<GetMoviesQuery, void>;
