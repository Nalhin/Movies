import { CommandHandler } from '@nestjs/cqrs';
import { AddFavouriteCommand } from '../add-favourite/add-favourite.command';
import { RemoveFavouritePort } from '../../port/in/command/remove-favourite.port';

@CommandHandler(AddFavouriteCommand)
export class AddFavouriteUseCase implements RemoveFavouritePort {
  async execute(command: AddFavouriteCommand) {
    return Promise.resolve(undefined);
  }
}
