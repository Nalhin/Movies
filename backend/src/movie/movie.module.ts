import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TmdbModule } from '../tmdb/tmdb.module';
import { QuestionAnsweringModule } from '../question-answering/question-answering.module';

@Module({
  imports: [TmdbModule, QuestionAnsweringModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
