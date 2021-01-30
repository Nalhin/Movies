import { setupServer } from 'msw/node';
import { Test } from '@nestjs/testing';
import {
  CACHE_MANAGER,
  CacheModule,
  HttpModule,
  HttpService,
} from '@nestjs/common';
import { HttpCacheService } from './http-cache.service';
import { rest } from 'msw';
import { Cache } from 'cache-manager';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

describe('HttpCacheService', () => {
  const server = setupServer();

  let httpClient: HttpService;
  let cacheService: HttpCacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register(), HttpModule],
      providers: [HttpCacheService],
    }).compile();

    cacheService = moduleRef.get(HttpCacheService);
    httpClient = moduleRef.get(HttpService);
    cacheManager = moduleRef.get(CACHE_MANAGER);
  });

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cacheManager.reset();
  });
  afterAll(() => server.close());
  beforeEach(() => cacheService.applyToAxios(httpClient.axiosRef));

  const addSuccessEndpoint = () => {
    server.use(
      rest.get('/success', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ result: 'result' })),
      ),
    );
  };

  it('should cache the response when request is successful', async () => {
    addSuccessEndpoint();
    await httpClient.get('/success').toPromise();
    const cachedResult = await cacheManager.get('/success');

    expect(cachedResult).toStrictEqual({
      result: 'result',
    });
  });

  it('should use query params in cache keys', async () => {
    addSuccessEndpoint();

    await httpClient
      .get('/success', { params: { param: 'param' } })
      .toPromise();
    const cachedResult = await cacheManager.get('/success?param=param');

    expect(cachedResult).toStrictEqual({
      result: 'result',
    });
  });

  it('should convert response to camel case', async () => {
    server.use(
      rest.get('/camel', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ result_result: 'result' })),
      ),
    );

    await httpClient.get('/camel').toPromise();
    const cachedResult = await cacheManager.get('/camel');

    expect(cachedResult).toStrictEqual({
      resultResult: 'result',
    });
  });

  it('should not cache the response when request is not successful', async () => {
    server.use(rest.get('/success', (req, res, ctx) => res(ctx.status(400))));

    await httpClient
      .get('/success')
      .pipe(catchError((e) => of(e)))
      .toPromise();
    const cachedResult = await cacheManager.get('/success');

    expect(cachedResult).toBeUndefined();
  });

  it('should use cached response instead of executing api call', async () => {
    let count = 0;
    server.use(
      rest.get('/count', (req, res, ctx) => {
        count++;
        return res(ctx.status(200), ctx.json({ result: 'result' }));
      }),
    );

    await httpClient.get('/count').toPromise();
    await httpClient.get('/count').toPromise();

    expect(count).toBe(1);
  });
});
