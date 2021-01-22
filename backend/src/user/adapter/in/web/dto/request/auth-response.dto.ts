import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../response/user-response.dto';

export class AuthResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
  @Expose()
  token: string;
}
