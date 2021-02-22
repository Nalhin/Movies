import { Module } from '@nestjs/common';
import { TmdbModule } from '../movie-data/tmdb-movie-data/tmdb.module';
import { MoviePersistenceModule } from '../persistance/movie-persistence.module';
import { MovieCastQueryAdapter } from './movie-cast-query.adapter';
import { MovieDomainAdapter } from './movie-domain.adapter';
import { MovieQueryAdapter } from './movie-query.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TmdbModule, MoviePersistenceModule, TypeOrmModule],
  providers: [MovieCastQueryAdapter, MovieDomainAdapter, MovieQueryAdapter],
  exports: [
    MovieCastQueryAdapter,
    MovieDomainAdapter,
    MovieQueryAdapter,
    TypeOrmModule,
    TmdbModule,
  ],
})
export class MovieDataAggregatorsModule {}
