import { Test, TestingModule } from '@nestjs/testing';
import { WikipediaPlotDetailsAdapter } from './wikipedia-plot-details.adapter';
import { HttpModule } from '@nestjs/common';

describe('WikipediaService', () => {
  let service: WikipediaPlotDetailsAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [WikipediaPlotDetailsAdapter],
    }).compile();

    service = module.get<WikipediaPlotDetailsAdapter>(
      WikipediaPlotDetailsAdapter,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
