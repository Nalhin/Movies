import { EntityRepository, Repository } from 'typeorm';
import { MovieRatingEntity } from './movie-rating.entity';

@EntityRepository(MovieRatingEntity)
export class MovieRatingRepository extends Repository<MovieRatingEntity> {}
