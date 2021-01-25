import { Param } from '@nestjs/common';

export function Id() {
  return Param('id');
}
