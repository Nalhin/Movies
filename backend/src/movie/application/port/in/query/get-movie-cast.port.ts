import { IQueryHandler } from '@nestjs/cqrs';
import { GetMovieCastQuery } from '../../../query/get-movie-cast/get-movie-cast.query';

export type GetMovieCastPort = IQueryHandler<GetMovieCastQuery, void>;
