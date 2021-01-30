import * as O from 'fp-ts/Option';
import { movieFactory } from '../../../../test/factories/movie';

describe('Movie domain model', () => {
  describe('rate()', () => {
    it('should return an empty option when movie has a rating', () => {
      const providedMovie = movieFactory.buildOne({ userRating: 4 });

      const actualMovie = providedMovie.rate(5);

      expect(actualMovie).toStrictEqual(O.none);
    });

    it('should return rated movie', () => {
      const providedMovie = movieFactory.buildOne({ userRating: null });

      const actualMovie = providedMovie.rate(5);

      expect(actualMovie).toStrictEqual(
        O.some(movieFactory.buildOne({ ...providedMovie, userRating: 5 })),
      );
    });
  });

  describe('removeRating()', () => {
    it('should return an empty option when the movie doesnt have a rating', () => {
      const providedMovie = movieFactory.buildOne({ userRating: null });

      const actualMovie = providedMovie.removeRating();

      expect(actualMovie).toStrictEqual(O.none);
    });

    it('should return a movie without a rating', () => {
      const providedMovie = movieFactory.buildOne({ userRating: 4 });

      const actualMovie = providedMovie.removeRating();

      expect(actualMovie).toStrictEqual(
        O.some(movieFactory.buildOne({ ...providedMovie, userRating: null })),
      );
    });
  });

  describe('removeFromFavourites()', () => {
    it('should return an empty option when the movie is not a favourite', () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: false });

      const actualMovie = providedMovie.removeFromFavourites();

      expect(O.none).toStrictEqual(actualMovie);
    });

    it('should return a movie that is not favourite', () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: true });

      const actualMovie = providedMovie.removeFromFavourites();

      expect(actualMovie).toStrictEqual(
        O.some(movieFactory.buildOne({ ...providedMovie, isFavourite: false })),
      );
    });
  });

  describe('markAsFavourite()', () => {
    it('should return an empty option when the movie is a favourite', () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: true });

      const actualMovie = providedMovie.markAsFavourite();

      expect(actualMovie).toStrictEqual(O.none);
    });

    it('should return a movie marked as a favourite', () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: false });

      const actualMovie = providedMovie.markAsFavourite();

      expect(actualMovie).toStrictEqual(
        O.some(movieFactory.buildOne({ ...providedMovie, isFavourite: true })),
      );
    });
  });
});
