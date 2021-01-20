import { UserResponseDto } from './user-response.dto';
import { Expose, Type } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
  @Expose()
  token: string;
}