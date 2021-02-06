import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../../../../user/adapter/out/persistance/database/user.entity';
import { MovieEntity } from '../movie/movie.entity';

@Entity({ name: 'movies_ratings' })
@Unique(['movie', 'author'])
export class MovieRatingEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'rating', nullable: false })
  rating: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.ratings, { nullable: false })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @CreateDateColumn({ name: 'createDate' })
  created: Date;
}
