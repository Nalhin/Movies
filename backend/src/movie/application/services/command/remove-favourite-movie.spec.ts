import { Test } from '@nestjs/testing';
import { FIND_MOVIE_PORT } from '../../port/out/find-movie.port';
import { UPDATE_MOVIE_PORT } from '../../port/out/update-movie.port';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { movieFactory } from '../../../../../test/factories/movie';
import { RemoveFavouriteMovieService } from './remove-favourite-movie.service';
import {
  RemoveFavouriteMovieCommand,
  RemoveFavouriteMovieErrors,
} from '../../port/in/command/remove-favourite-movie.use-case';

describe('RemoveFavouriteMovieService', () => {
  const findMoviePort = {
    findById: jest.fn(),
  };
  const updateMoviePort = {
    updateMovie: jest.fn(),
  };
  let service: RemoveFavouriteMovieService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RemoveFavouriteMovieService,
        { provide: FIND_MOVIE_PORT, useValue: findMoviePort },
        {
          provide: UPDATE_MOVIE_PORT,
          useValue: updateMoviePort,
        },
      ],
    }).compile();

    service = moduleRef.get(RemoveFavouriteMovieService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('removeFavourite()', () => {
    it('should return an error when the movie is not found', async () => {
      findMoviePort.findById.mockResolvedValue(O.none);

      const actualResult = await service.removeFavourite(
        new RemoveFavouriteMovieCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveFavouriteMovieErrors.MovieNotFound),
      );
    });

    it('should return an error when movie is not favourite', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: false });
      findMoviePort.findById.mockResolvedValue(O.some(providedMovie));

      const actualResult = await service.removeFavourite(
        new RemoveFavouriteMovieCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveFavouriteMovieErrors.MovieNotFavourite),
      );
      expect(updateMoviePort.updateMovie).not.toHaveBeenCalled();
    });

    it('should remove the movie from favourites and persist the changes', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: true });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockResolvedValue(undefined);

      const actualResult = await service.removeFavourite(
        new RemoveFavouriteMovieCommand(1, 1),
      );

      expect(E.isRight(actualResult)).toBeTrue();
      expect(updateMoviePort.updateMovie).toBeCalledWith(
        expect.objectContaining({ ...providedMovie, isFavourite: false }),
        1,
      );
    });

    it('should return error when persistence it not successful', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: true });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockRejectedValueOnce(undefined);

      const actualResult = await service.removeFavourite(
        new RemoveFavouriteMovieCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(RemoveFavouriteMovieErrors.PersistenceError),
      );
    });
  });
});
