import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../../../../user/user.entity';
import { MovieRating } from '../movie-rating/movie-rating.entity';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  imdbId: string;

  @ManyToOne(() => MovieRating)
  ratings: MovieRating[];

  @ManyToMany(() => User)
  favouriteBy: User[];
}
