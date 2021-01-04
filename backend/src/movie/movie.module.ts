import { Module } from '@nestjs/common';
import { MovieController } from './adapter/in/web/movie.controller';
import { TmdbModule } from '../tmdb/tmdb.module';
import { QuestionAnsweringModule } from './adapter/out/machine-learning/question-answering/question-answering.module';
import { WikipediaPlotDetailsModule } from './adapter/out/http/wikipedia-plot-details/wikipedia-plot-details.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TmdbModule,
    QuestionAnsweringModule,
    WikipediaPlotDetailsModule,
    CqrsModule,
  ],
  controllers: [MovieController],
  providers: [],
})
export class MovieModule {}
