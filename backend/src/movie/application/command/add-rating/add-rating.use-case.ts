import { CommandHandler } from '@nestjs/cqrs';
import { AddFavouriteCommand } from '../add-favourite/add-favourite.command';
import { AddRatingPort } from '../../port/in/command/add-rating.port';

@CommandHandler(AddFavouriteCommand)
export class AddFavouriteUseCase implements AddRatingPort {
  async execute(command: AddFavouriteCommand) {
    return Promise.resolve(undefined);
  }
}
