import { IsEmail, IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
