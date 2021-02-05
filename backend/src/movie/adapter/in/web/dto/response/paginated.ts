import { Type as TsType } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export function Paginated<T>(classRef: TsType<T>): any {
  abstract class PaginatedType {
    @Expose()
    @ApiProperty({ type: [classRef] })
    @Type(() => classRef)
    data: T[];
    @Expose()
    @ApiProperty()
    page: number;
    @Expose()
    @ApiProperty()
    hasNextPage: boolean;
    @Expose()
    @ApiProperty()
    totalPages: number;
  }
  return PaginatedType;
}
