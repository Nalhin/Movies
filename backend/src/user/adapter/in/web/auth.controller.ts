import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { plainToClass } from 'class-transformer';
import {
  SIGN_UP_USER_USE_CASE,
  SignUpUserUseCase,
} from '../../../application/port/in/command/sign-up-user.use-case';
import { Inject } from '@nestjs/common/decorators/core';
import {
  LOGIN_USER_USE_CASE,
  LoginUserUseCase,
} from '../../../application/port/in/command/login-user.use-case';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(SIGN_UP_USER_USE_CASE)
    private readonly signUpUseCase: SignUpUserUseCase,
    @Inject(LOGIN_USER_USE_CASE)
    private readonly loginUseCase: LoginUserUseCase,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginRequestDto): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      await this.loginUseCase.login(loginUserDto),
    );
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() registerUserDto: SignUpRequestDto,
  ): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      await this.signUpUseCase.signUp(registerUserDto),
    );
  }
}
