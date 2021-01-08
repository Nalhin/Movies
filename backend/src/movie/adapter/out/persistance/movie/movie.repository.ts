import { EntityRepository, Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';

interface MoviePersonalDetails {
  userRating: number | null;
  isFavourite: boolean;
  id: number;
}

interface MoviePersonalExtendedDetails extends MoviePersonalDetails {
  averageRating: number | null;
}

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {
  getPersonalMovieDetails(
    movieId: number,
    userId: number,
  ): Promise<MoviePersonalDetails | undefined> {
    return this.createQueryBuilder('movies')
      .addSelect('movies.id', 'id')
      .addSelect('user_rating.rating', 'userRating')
      .addSelect(
        (qb) =>
          qb
            .subQuery()
            .select('COUNT(mfbu) > 0')
            .from('movies_favourite_by_users', 'mfbu')
            .where('mfbu.movie_id=:movieId', { movieId })
            .andWhere('mfbu.user_id=:userId', { userId }),
        'isFavourite',
      )
      .leftJoin('movies.ratings', 'user_rating', 'user_rating.author.id=:id', {
        id: userId,
      })
      .getRawOne();
  }

  getPersonalMoviesDetails(
    movieIds: number[],
    userId: number,
  ): Promise<MoviePersonalExtendedDetails[]> {
    let query = this.createQueryBuilder('movies')
      .select('movies.id', 'id')
      .addSelect('AVG(ratings.rating)', 'averageRating')
      .whereInIds(movieIds)
      .leftJoin('movies.ratings', 'ratings')
      .groupBy('movies.id');

    if (userId) {
      query = query
        .leftJoin(
          'movies.ratings',
          'userRating',
          'userRating.author.id=:userId',
          {
            userId,
          },
        )
        .addSelect('userRating.rating', 'userRating')
        .leftJoin('movies.favouriteBy', 'mfbu', 'mfbu.id=:userId', {
          userId,
        })
        .addSelect('COUNT(mfbu.id) > 0', 'isFavourite')
        .addGroupBy('userRating.rating');
    }

    return query.getRawMany().then((records) =>
      records.map((record) => ({
        ...record,
        averageRating: record.averageRating
          ? Number(record.averageRating)
          : null,
      })),
    );
  }
}
