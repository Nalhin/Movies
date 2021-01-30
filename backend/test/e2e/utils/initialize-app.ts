import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { TypeOrmConfigService } from '../../../src/core/config/typerom.config';
import { TypeormTestConfig } from '../../config/typeorm-test.config';
import { TypeOrmTestUtils } from './typeorm-test.utils';
import { CACHE_MANAGER, INestApplication } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheTestConfigService } from '../../config/cache-test.config';
import { CacheConfigService } from '../../../src/core/config/cache.config';
import { TmbdConfigService } from '../../../src/core/config/tmdb.config';
import { TmbdTestConfigService } from '../../config/tmdb-test.config';
import { questionAnsweringTestConfig } from '../../config/question-anwering-test.config';

export interface E2EApp {
  app: INestApplication;
  dbTestUtils: TypeOrmTestUtils;
  cleanup: () => void;
}

interface TestAppOverrides {
  provider: any;
  class?: any;
  value?: any;
}

export async function initializeApp(
  { overrides }: { overrides?: TestAppOverrides[] } = { overrides: [] },
) {
  let moduleFixture = Test.createTestingModule({
    imports: [AppModule],
    providers: [TypeOrmTestUtils],
  })
    .overrideProvider(CacheConfigService)
    .useClass(CacheTestConfigService)
    .overrideProvider(TypeOrmConfigService)
    .useClass(TypeormTestConfig)
    .overrideProvider(TmbdConfigService)
    .useClass(TmbdTestConfigService)
    .overrideProvider(questionAnsweringTestConfig.KEY)
    .useValue(questionAnsweringTestConfig);

  for (const override of overrides) {
    if (override.value) {
      moduleFixture = moduleFixture
        .overrideProvider(override.provider)
        .useValue(override.value);
    } else {
      moduleFixture = moduleFixture
        .overrideProvider(override.provider)
        .useClass(override.class);
    }
  }

  const testingModule = await moduleFixture.compile();

  const app = testingModule.createNestApplication();
  await app.init();

  const cache = await app.get<Cache>(CACHE_MANAGER);
  cache.reset();

  const dbTestUtils = app.get(TypeOrmTestUtils);
  await dbTestUtils.startServer();

  const cleanup = async () => {
    await dbTestUtils.closeServer();
    await app.close();
  };

  return { app, dbTestUtils, cleanup };
}
