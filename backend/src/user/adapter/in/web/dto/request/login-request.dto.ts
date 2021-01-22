import { IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  username: string;
  @MinLength(6)
  password: string;
}
