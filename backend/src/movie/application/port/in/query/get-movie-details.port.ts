import { IQueryHandler } from '@nestjs/cqrs';
import { GetMovieDetailsQuery } from '../../../query/get-movie-details/get-movie-details.query';

export type GetMovieDetailsPort = IQueryHandler<GetMovieDetailsQuery, void>;
