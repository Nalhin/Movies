import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAnsweringAdapter } from './question-answering.adapter';

describe('QuestionAnsweringService', () => {
  let service: QuestionAnsweringAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionAnsweringAdapter],
    }).compile();

    service = module.get<QuestionAnsweringAdapter>(QuestionAnsweringAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
