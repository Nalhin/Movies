import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../../../../user/user.entity';
import { MovieEntity } from '../movie/movie.entity';

@Entity({ name: 'movies_ratings' })
@Unique(['movie', 'author'])
export class MovieRatingEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'rating', nullable: false })
  rating: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => MovieEntity, (movie) => movie.ratings, { nullable: false })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
