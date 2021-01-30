import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie/movie.repository';
import { MovieRatingRepository } from './movie-rating/movie-rating.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository, MovieRatingRepository])],
  exports: [TypeOrmModule],
})
export class MoviePersistenceModule {}
