import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { TypeOrmConfigService } from '../../src/core/config/typerom.config';
import { TypeormTestConfig } from '../config/typeorm-test.config';
import { QUESTION_ANSWERING_PORT } from '../../src/movie/application/port/out/question-answering.port';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TypeOrmConfigService)
      .useClass(TypeormTestConfig)
      .overrideProvider(QUESTION_ANSWERING_PORT)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    expect(true).toBeTruthy();
  });
});
