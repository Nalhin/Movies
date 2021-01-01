import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginRequestDto): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      await this.authService.login(loginUserDto),
    );
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registerUserDto: SignUpRequestDto,
  ): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      await this.authService.signUp(registerUserDto),
    );
  }
}
