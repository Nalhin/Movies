import { ICommandHandler } from '@nestjs/cqrs';
import { RemoveRatingCommand } from '../../../command/remove-rating/remove-rating.command';

export type RemoveRatingPort = ICommandHandler<RemoveRatingCommand, void>;
