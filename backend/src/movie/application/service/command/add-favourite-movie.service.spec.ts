import { Test } from '@nestjs/testing';
import { FIND_MOVIE_PORT } from '../../port/out/find-movie.port';
import { UPDATE_MOVIE_PORT } from '../../port/out/update-movie.port';
import { AddFavouriteMovieService } from './add-favourite-movie.service';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import {
  AddFavouriteMovieCommand,
  AddFavouriteMovieErrors,
} from '../../port/in/command/add-favourite-movie.use-case';
import { movieFactory } from '../../../../../test/factories/movie';

describe('AddFavouriteMovieService', () => {
  const findMoviePort = {
    findById: jest.fn(),
  };
  const updateMoviePort = {
    updateMovie: jest.fn(),
  };
  let service: AddFavouriteMovieService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AddFavouriteMovieService,
        { provide: FIND_MOVIE_PORT, useValue: findMoviePort },
        {
          provide: UPDATE_MOVIE_PORT,
          useValue: updateMoviePort,
        },
      ],
    }).compile();

    service = moduleRef.get(AddFavouriteMovieService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addFavourite()', () => {
    it('should return an error when the movie is not found', async () => {
      findMoviePort.findById.mockReturnValueOnce(O.none);

      const actualResult = await service.addFavourite(
        new AddFavouriteMovieCommand(1, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(AddFavouriteMovieErrors.MovieNotFound),
      );
    });

    it('should return an error when the movie is already favourite', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: true });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));

      const actualResult = await service.addFavourite(
        new AddFavouriteMovieCommand(providedMovie.id, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(AddFavouriteMovieErrors.MovieAlreadyFavourite),
      );
      expect(updateMoviePort.updateMovie).not.toHaveBeenCalled();
    });

    it('should add the movie as favourite and persist the changes', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: false });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockResolvedValue(undefined);

      const actualResult = await service.addFavourite(
        new AddFavouriteMovieCommand(providedMovie.id, 1),
      );

      expect(E.isRight(actualResult)).toBeTrue();
      expect(updateMoviePort.updateMovie).toBeCalledWith(
        expect.objectContaining({ ...providedMovie, isFavourite: true }),
        1,
      );
    });

    it('should return error when persistence it not successful', async () => {
      const providedMovie = movieFactory.buildOne({ isFavourite: false });
      findMoviePort.findById.mockReturnValueOnce(O.some(providedMovie));
      updateMoviePort.updateMovie.mockRejectedValueOnce(undefined);

      const actualResult = await service.addFavourite(
        new AddFavouriteMovieCommand(providedMovie.id, 1),
      );

      expect(E.isLeft(actualResult)).toBeTrue();
      expect(actualResult).toStrictEqual(
        E.left(AddFavouriteMovieErrors.PersistenceError),
      );
    });
  });
});
