import { Controller, Get, Post } from '@nestjs/common';
import { AuthRequired } from '../common/decorators/auth-required.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UserController {
  @Get('/me')
  @AuthRequired()
  me(@CurrentUser() user: User): UserResponseDto {
    return plainToClass(UserResponseDto, user);
  }

  @Post('/me/upload-avatar')
  uploadAvatar() {
    return null;
  }
}
