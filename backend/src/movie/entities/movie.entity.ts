import { Column, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { MovieRating } from './movie-rating.entity';

export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  imdbId: string;

  @ManyToOne(() => MovieRating)
  ratings: MovieRating[];

  @ManyToMany(() => User)
  favouriteBy: User[];
}
