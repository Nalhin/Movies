import { GetSimilarMoviesPort } from '../../port/in/query/get-similar-movies.port';
import { GetSimilarMoviesQuery } from './get-similar-movies.query';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(GetSimilarMoviesQuery)
export class GetSimilarMoviesUseCase implements GetSimilarMoviesPort {
  execute(query: GetSimilarMoviesQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
