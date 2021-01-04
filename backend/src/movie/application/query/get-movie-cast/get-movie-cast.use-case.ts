import { QueryHandler } from '@nestjs/cqrs';
import { GetMovieCastPort } from '../../port/in/query/get-movie-cast.port';
import { GetMovieCastQuery } from './get-movie-cast.query';

@QueryHandler(GetMovieCastQuery)
export class GetMovieCastUseCase implements GetMovieCastPort {
  execute(query: GetMovieCastQuery): Promise<any> {
    return null;
  }
}
