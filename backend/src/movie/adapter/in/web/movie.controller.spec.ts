import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { CqrsModule } from '@nestjs/cqrs';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [MovieController],
      providers: [],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
