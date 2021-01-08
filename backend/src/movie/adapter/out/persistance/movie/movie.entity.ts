import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../../../../user/user.entity';
import { MovieRatingEntity } from '../movie-rating/movie-rating.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'imdb_id', nullable: false })
  imdbId: string;

  @OneToMany(() => MovieRatingEntity, (rating) => rating.movie, {
    cascade: ['insert', 'update'],
  })
  ratings: MovieRatingEntity[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'movies_favourite_by_users',
    joinColumn: { name: 'movie_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  favouriteBy: User[];
}
