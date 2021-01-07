import { Test, TestingModule } from '@nestjs/testing';
import { TmdbClientService } from './tmdb-client.service';
import { HttpModule } from '@nestjs/common';

describe('TmdbService', () => {
  let service: TmdbClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({})],
      providers: [TmdbClientService],
    }).compile();

    service = module.get<TmdbClientService>(TmdbClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
