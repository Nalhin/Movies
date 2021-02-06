import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MovieRatingEntity } from '../movie-rating/movie-rating.entity';
import { MovieFavouriteByUserEntity } from '../movie-favourite-by-user/movie-favourite-by-user.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'imdb_id', nullable: false })
  imdbId: string;

  @OneToMany(() => MovieRatingEntity, (rating) => rating.movie)
  ratings: MovieRatingEntity[];

  @OneToMany(() => MovieFavouriteByUserEntity, (mfbu) => mfbu.movie)
  favouriteBy: MovieFavouriteByUserEntity[];
}
