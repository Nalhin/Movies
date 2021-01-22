import { Controller, Get } from '@nestjs/common';
import { AuthRequired } from '../../../../common/decorators/auth-required.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { plainToClass } from 'class-transformer';
import { User } from '../../../domain/models/user.domain-model';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response/user-response.dto';

@Controller()
@ApiTags('user')
export class UserController {
  @Get('/me')
  @AuthRequired()
  me(@CurrentUser() user: User): UserResponseDto {
    return plainToClass(UserResponseDto, user);
  }
}
