import { RateMovieCommand } from './rate-movie.use-case';

describe('RateMoveUseCase', () => {
  describe('RateMovieCommand', () => {
    it('should initialize command with valid fields', () => {
      const result = new RateMovieCommand(1, 2, 3);

      expect(result.movieId).toBe(1);
      expect(result.rating).toBe(2);
      expect(result.userId).toBe(3);
    });

    it('should throw validation error when rating is bellow 1', () => {
      expect(() => {
        new RateMovieCommand(1, 0, 1);
      }).toThrowSelfValidationErrorContainingAllFields(['rating']);
    });

    it('should throw validation error when rating is above 10', () => {
      expect(() => {
        new RateMovieCommand(1, 11, 1);
      }).toThrowSelfValidationErrorContainingAllFields(['rating']);
    });

    it('should throw validation error when rating is not an integer', () => {
      expect(() => {
        new RateMovieCommand(1, 5.5, 1);
      }).toThrowSelfValidationErrorContainingAllFields(['rating']);
    });
  });
});
