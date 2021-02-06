import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie/movie.repository';
import { MovieRatingRepository } from './movie-rating/movie-rating.repository';
import { Module } from '@nestjs/common';
import { MovieFavouriteByUserRepository } from './movie-favourite-by-user/movie-favourite-by-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieRepository,
      MovieRatingRepository,
      MovieFavouriteByUserRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class MoviePersistenceModule {}
