import { ICommandHandler } from '@nestjs/cqrs';
import { AddFavouriteCommand } from '../../../command/add-favourite/add-favourite.command';

export type AddFavouritePort = ICommandHandler<AddFavouriteCommand, void>;
