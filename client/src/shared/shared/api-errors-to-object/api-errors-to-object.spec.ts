import { apiErrorsToObject } from './api-errors-to-object';

describe('apiErrorsToObject', () => {
  it('should return an empty object when no errors are returned', () => {
    const actualResult = apiErrorsToObject({});

    expect(actualResult).toStrictEqual({});
  });

  it('should return object with correct structure when errors are returned', () => {
    const actualResult = apiErrorsToObject({
      response: {
        data: {
          errors: [{ field: 'username', messages: ['username is too short'] }],
        },
      },
    });

    expect(actualResult.username).toBe('username is too short');
  });
});
