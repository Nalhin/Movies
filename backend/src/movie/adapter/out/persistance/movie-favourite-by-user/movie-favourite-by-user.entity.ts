import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../../../../user/adapter/out/persistance/database/user.entity';
import { MovieEntity } from '../movie/movie.entity';

@Entity({ name: 'movies_favourite_by_users' })
@Unique(['movie', 'author'])
export class MovieFavouriteByUserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.ratings, { nullable: false })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @CreateDateColumn({ name: 'createDate' })
  created: Date;
}
