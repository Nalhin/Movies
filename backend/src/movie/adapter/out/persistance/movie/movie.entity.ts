import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../../../../user/user.entity';
import { MovieRatingEntity } from '../movie-rating/movie-rating.entity';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  imdbId: string;

  @ManyToOne(() => MovieRatingEntity)
  ratings: MovieRatingEntity[];

  @ManyToMany(() => User)
  favouriteBy: User[];
}
