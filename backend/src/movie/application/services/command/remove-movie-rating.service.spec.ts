import { Test } from '@nestjs/testing';
import { FIND_MOVIE_PORT } from '../../port/out/find-movie.port';
import { UPDATE_MOVIE_PORT } from '../../port/out/update-movie.port';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { movieFactory } from '../../../../../test/factories/movie';
import { RemoveMovieRatingService } from './remove-movie-rating.service';
import {
  RemoveMovieRatingCommand,
  RemoveMovieRatingErrors,
} from '../../port/in/command/remove-movie-rating.use-case';

describe('RemoveMovieRatingService', () => {
  const findMoviePort = {
    findById: jest.fn(),
  };
  const updateMoviePort = {
    updateMovie: jest.fn(),
  };
  let service: RemoveMovieRatingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RemoveMovieRatingService,
        { provide: FIND_MOVIE_PORT, useValue: findMoviePort },
        {
          provide: UPDATE_MOVIE_PORT,
          useValue: updateMoviePort,
        },
      ],
    }).compile();

    service = moduleRef.get(RemoveMovieRatingService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('removeRating()', () => {
    it('should return an error when the movie is not found', async () => {
      findMoviePort.findById.mockResolvedValue(O.none);

      const actualResult = await service.removeRating(
        new RemoveMovieRatingCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveMovieRatingErrors.MovieNotFound),
      );
    });

    it('should return an error when movie is not rated by user', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: null });
      findMoviePort.findById.mockResolvedValue(O.some(providedMovie));

      const actualResult = await service.removeRating(
        new RemoveMovieRatingCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveMovieRatingErrors.MovieNotRated),
      );
      expect(updateMoviePort.updateMovie).not.toHaveBeenCalled();
    });

    it('should remove the movie from favourites and persist the changes', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: 3 });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockResolvedValue(undefined);

      const actualResult = await service.removeRating(
        new RemoveMovieRatingCommand(1, 1),
      );

      expect(E.isRight(actualResult)).toBeTrue();
      expect(updateMoviePort.updateMovie).toBeCalledWith(
        expect.objectContaining({ ...providedMovie, userRating: null }),
        1,
      );
    });

    it('should return error when persistence it not successful', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: 3 });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockRejectedValueOnce(undefined);

      const actualResult = await service.removeRating(
        new RemoveMovieRatingCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveMovieRatingErrors.PersistenceError),
      );
    });
  });
});
