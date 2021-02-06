import { EntityRepository, Repository } from 'typeorm';
import { MovieFavouriteByUserEntity } from './movie-favourite-by-user.entity';

@EntityRepository(MovieFavouriteByUserEntity)
export class MovieFavouriteByUserRepository extends Repository<MovieFavouriteByUserEntity> {}
