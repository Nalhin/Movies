import { EntityRepository, Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';

interface MoviePersonalDetails {
  userRating: number | null;
  isFavourite: boolean;
  averageRating: number | null;
  id: number;
}

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {
  async getPersonalMovieDetails(
    movieId: number,
    userId?: number,
  ): Promise<MoviePersonalDetails | undefined> {
    let query = this.createQueryBuilder('movies')
      .select('movies.id', 'id')
      .addSelect('AVG(ratings.rating)', 'averageRating')
      .leftJoin('movies.ratings', 'ratings')
      .addGroupBy('movies.id');

    if (userId) {
      query = query
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
        .addSelect('user_rating.rating', 'userRating')
        .addGroupBy('user_rating.rating')
        .leftJoin(
          'movies.ratings',
          'user_rating',
          'user_rating.author.id=:id',
          {
            id: userId,
          },
        );
    }

    const result = await query.getRawOne();

    return {
      ...result,
      userRating: result?.userRating ?? null,
      isFavourite: result?.isFavourite ?? false,
      averageRating: result?.averageRating
        ? Number(result.averageRating)
        : null,
    };
  }

  getPersonalMoviesDetails(
    movieIds: number[],
    userId?: number,
  ): Promise<MoviePersonalDetails[]> {
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
