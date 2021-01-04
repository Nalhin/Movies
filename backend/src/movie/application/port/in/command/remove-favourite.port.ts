import { ICommandHandler } from '@nestjs/cqrs';
import { RemoveFavouriteCommand } from '../../../command/remove-favourite/remove-favourite.command';

export type RemoveFavouritePort = ICommandHandler<RemoveFavouriteCommand, void>;
