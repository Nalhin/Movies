import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async signToken(user: User) {
    const payload: JwtPayload = { username: user.username };
    return this.jwtService.sign(payload);
  }

  public async login(loginDto: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOneByUsername(loginDto.username);

    if (!user || (await user.comparePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return { user, token: await this.signToken(user) };
  }

  public async signUp(signUpDto: SignUpRequestDto): Promise<AuthResponseDto> {
    if (
      await this.userService.existsByEmailOrUsername(
        signUpDto.email,
        signUpDto.username,
      )
    ) {
      throw new UnprocessableEntityException('Username or email taken');
    }
    const user = await this.userService.save(signUpDto);
    return { user, token: await this.signToken(user) };
  }
}
