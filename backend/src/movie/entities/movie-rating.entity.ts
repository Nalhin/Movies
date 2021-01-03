import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Movie } from './movie.entity';

export class MovieRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Movie)
  movie: Movie;
}
