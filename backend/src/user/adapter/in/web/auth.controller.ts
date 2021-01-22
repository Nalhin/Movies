import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  SIGN_UP_USER_USE_CASE,
  SignUpUserErrors,
  SignUpUserUseCase,
} from '../../../application/port/in/command/sign-up-user.use-case';
import { Inject } from '@nestjs/common/decorators/core';
import {
  LOGIN_USER_USE_CASE,
  LoginUserErrors,
  LoginUserUseCase,
} from '../../../application/port/in/command/login-user.use-case';
import { ApiTags } from '@nestjs/swagger';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { AuthResponseDto } from './dto/request/auth-response.dto';
import { SignUpRequestDto } from './dto/request/sign-up-request.dto';

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
    return pipe(
      await this.loginUseCase.login(loginUserDto),
      E.fold(
        (error) => {
          switch (error) {
            case LoginUserErrors.InvalidCredentials:
              throw new ForbiddenException('Invalid credentials');
          }
        },
        (resp) => plainToClass(AuthResponseDto, resp),
      ),
    );
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() registerUserDto: SignUpRequestDto,
  ): Promise<AuthResponseDto> {
    return pipe(
      await this.signUpUseCase.signUp(registerUserDto),
      E.fold(
        (error) => {
          switch (error) {
            case SignUpUserErrors.UsernameOrEmailTaken:
              throw new UnprocessableEntityException(
                'Username or password is already taken',
              );
          }
        },
        (resp) => plainToClass(AuthResponseDto, resp),
      ),
    );
  }
}
