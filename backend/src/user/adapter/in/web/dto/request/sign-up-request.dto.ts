import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'username',
    minLength: 2,
    maxLength: 50,
  })
  username: string;

  @ApiProperty({
    example: 'Admin123',
    minLength: 6,
    maxLength: 50,
  })
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
  })
  email: string;
}
