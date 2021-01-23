import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { TypeOrmConfigService } from '../../../src/core/config/typerom.config';
import { TypeormTestConfig } from '../../config/typeorm-test.config';
import { TypeOrmTestUtils } from './typeorm-test.utils';
import { INestApplication } from '@nestjs/common';

export interface E2EApp {
  app: INestApplication;
  dbTestUtils: TypeOrmTestUtils;
  cleanup: () => void;
}

export async function initializeApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [TypeOrmTestUtils],
  })
    .overrideProvider(TypeOrmConfigService)
    .useClass(TypeormTestConfig)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const dbTestUtils = app.get(TypeOrmTestUtils);
  await dbTestUtils.startServer();

  const cleanup = async () => {
    await dbTestUtils.closeServer();
    await app.close();
  };

  return { app, dbTestUtils, cleanup };
}
