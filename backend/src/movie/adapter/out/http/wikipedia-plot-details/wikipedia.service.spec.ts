import { Test, TestingModule } from '@nestjs/testing';
import { WikipediaPlotDetailsService } from './wikipedia-plot-details.service';
import { HttpModule } from '@nestjs/common';

describe('WikipediaService', () => {
  let service: WikipediaPlotDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [WikipediaPlotDetailsService],
    }).compile();

    service = module.get<WikipediaPlotDetailsService>(
      WikipediaPlotDetailsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
