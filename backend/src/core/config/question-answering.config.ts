import { ConfigType, registerAs } from '@nestjs/config';

export const questionAnsweringConfig = registerAs('questionAnswering', () => ({
  enableML: Boolean(process.env.ENABLE_ML) ?? Boolean(process.env.production),
}));

export type QuestionAnsweringConfig = ConfigType<
  typeof questionAnsweringConfig
>;
