import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'username',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Admin123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  password: string;
}
