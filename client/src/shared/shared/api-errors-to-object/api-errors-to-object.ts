import type { AxiosError } from 'axios';

export function apiErrorsToObject(error: AxiosError) {
  const formErrors = error.response?.data?.errors ?? [];

  return formErrors.reduce(
    (
      a: { [key: string]: string },
      b: { field: string; messages: string[] },
    ) => {
      a[b.field] = b.messages[0];
      return a;
    },
    {},
  );
}
