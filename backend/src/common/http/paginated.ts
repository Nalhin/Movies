import { Type as TsType } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';

export function Paginated<T>(classRef: TsType<T>): any {
  abstract class PaginatedType {
    @Expose()
    @Type(() => classRef)
    data: T[];
    @Expose()
    page: number;
    @Expose()
    hasNextPage: boolean;
    @Expose()
    totalPages: number;
  }
  return PaginatedType;
}
