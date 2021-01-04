import { GetMovieDetailsQuery } from './get-movie-details.query';
import { GetMovieDetailsPort } from '../../port/in/query/get-movie-details.port';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(GetMovieDetailsQuery)
export class GetMovieDetailsUseCase implements GetMovieDetailsPort {
  execute(query: GetMovieDetailsQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
