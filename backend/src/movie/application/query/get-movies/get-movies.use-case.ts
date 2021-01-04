import { CommandHandler } from '@nestjs/cqrs';
import { GetMoviesPort } from '../../port/in/query/get-movies.port';
import { GetMoviesQuery } from './get-movies.query';

@CommandHandler(GetMoviesQuery)
export class GetMoviesUseCase implements GetMoviesPort {
  execute(query: GetMoviesQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
