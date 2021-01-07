import { EntityRepository, Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {
  getPersonalMovieDetails(
    movieId: number,
    userId: number,
  ): Promise<
    { userRating: number; isFavourite: boolean; ratingId: number } | undefined
  > {
    return this.createQueryBuilder('movies')
      .leftJoin('movies.ratings', 'user_rating', 'user_rating.author.id=:id', {
        id: userId,
      })
      .addSelect('user_rating.rating', 'userRating')
      .leftJoin('movies.favouriteBy', 'mfbu', 'mfbu.id=:id', {
        id: userId,
      })
      .addSelect('COUNT(mfbu.id) > 0', 'isFavourite')
      .addSelect('user_rating.id', 'rating_id')
      .addGroupBy('movies.id')
      .addGroupBy('user_rating.id')
      .getRawOne();
  }
}
