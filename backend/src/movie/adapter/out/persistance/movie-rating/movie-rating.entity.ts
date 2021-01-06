import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../../../user/user.entity';
import { MovieEntity } from '../movie/movie.entity';

@Entity({ name: 'movie_rating' })
export class MovieRatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => MovieEntity)
  movie: MovieEntity;
}
