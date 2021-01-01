import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Injectable } from '@nestjs/common';

@Injectable()
export class ExcludePropertiesClassSerializerInterceptor extends ClassSerializerInterceptor {
  constructor(protected readonly reflector: Reflector) {
    super(reflector, { excludeExtraneousValues: true });
  }
}
