import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  username: string;
  @Expose()
  email: string;
}
