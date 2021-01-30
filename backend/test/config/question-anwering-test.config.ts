import { registerAs } from '@nestjs/config';

export const questionAnsweringTestConfig = registerAs(
  'questionAnswering',
  () => ({
    enableML: false,
  }),
);
