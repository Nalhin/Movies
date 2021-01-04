import { CommandHandler } from '@nestjs/cqrs';
import { RemoveRatingPort } from '../../port/in/command/remove-rating.port';
import { RemoveRatingCommand } from './remove-rating.command';

@CommandHandler(RemoveRatingCommand)
export class RemoveRatingUseCase implements RemoveRatingPort {
  async execute(command: RemoveRatingCommand) {
    return Promise.resolve(undefined);
  }
}
