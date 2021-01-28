import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { TypeOrmConfigService } from '../../../src/core/config/typerom.config';
import { TypeormTestConfig } from '../../config/typeorm-test.config';
import { TypeOrmTestUtils } from './typeorm-test.utils';
import { CACHE_MANAGER, INestApplication } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheTestConfigService } from '../../config/cache-test.config';
import { CacheConfigService } from '../../../src/core/config/cache.config';
import { TmbdConfigService } from '../../../src/movie/adapter/out/http/tmdb-movie/tmdb-config.service';
import { TmbdTestConfigService } from '../../config/tmdb-test.config';

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
    .overrideProvider(CacheConfigService)
    .useClass(CacheTestConfigService)
    .overrideProvider(TypeOrmConfigService)
    .useClass(TypeormTestConfig)
    .overrideProvider(TmbdConfigService)
    .useClass(TmbdTestConfigService)
    .compile();

  const app = moduleFixture.createNestApplication();
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
