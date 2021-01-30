import { Test } from '@nestjs/testing';
import { FIND_MOVIE_PORT } from '../../port/out/find-movie.port';
import { UPDATE_MOVIE_PORT } from '../../port/out/update-movie.port';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { movieFactory } from '../../../../../test/factories/movie';
import { RateMovieService } from './rate-movie.service';
import {
  RateMovieCommand,
  RateMovieErrors,
} from '../../port/in/command/rate-movie.use-case';

describe('RateMovieService', () => {
  const findMoviePort = {
    findById: jest.fn(),
  };
  const updateMoviePort = {
    updateMovie: jest.fn(),
  };
  let service: RateMovieService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RateMovieService,
        { provide: FIND_MOVIE_PORT, useValue: findMoviePort },
        {
          provide: UPDATE_MOVIE_PORT,
          useValue: updateMoviePort,
        },
      ],
    }).compile();

    service = moduleRef.get(RateMovieService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rateMovie()', () => {
    it('should return error when movie is not found', async () => {
      findMoviePort.findById.mockResolvedValue(O.none);

      const actualResult = await service.rateMovie(
        new RateMovieCommand(1, 5, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(E.left(RateMovieErrors.MovieNotFound));
    });

    it('should return an error when the movie is already rated', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: 4 });
      findMoviePort.findById.mockResolvedValue(O.some(providedMovie));

      const actualResult = await service.rateMovie(
        new RateMovieCommand(1, 5, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RateMovieErrors.MovieAlreadyRated),
      );
      expect(updateMoviePort.updateMovie).not.toHaveBeenCalled();
    });

    it('should add rating and persist the changes', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: null });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockResolvedValue(undefined);

      const actualResult = await service.rateMovie(
        new RateMovieCommand(providedMovie.id, 5, 1),
      );

      expect(E.isRight(actualResult)).toBeTrue();
      expect(updateMoviePort.updateMovie).toBeCalledWith(
        expect.objectContaining({ ...providedMovie, userRating: 5 }),
        1,
      );
    });

    it('should return error when persistence it not successful', async () => {
      const providedMovie = movieFactory.buildOne({ userRating: null });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockRejectedValueOnce(undefined);

      const actualResult = await service.rateMovie(
        new RateMovieCommand(providedMovie.id, 5, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RateMovieErrors.PersistenceError),
      );
    });
  });
});
