import { CommandHandler } from '@nestjs/cqrs';
import { AddFavouriteCommand } from './add-favourite.command';
import { AddFavouritePort } from '../../port/in/command/add-favourite.port';

@CommandHandler(AddFavouriteCommand)
export class AddFavouriteUseCase implements AddFavouritePort {
  async execute(command: AddFavouriteCommand) {
    return Promise.resolve(undefined);
  }
}
