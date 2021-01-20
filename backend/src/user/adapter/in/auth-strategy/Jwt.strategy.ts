import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConfig, JwtConfig } from '../../../../core/config/jwt.config';
import {
  GET_USER_BY_USERNAME_USE_CASE,
  GetByUsernameUseCase,
} from '../../../application/port/in/query/get-by-username.use-case';
import {
  AnonymousUser,
  AuthenticatedUser,
} from '../../../../common/model/app-user.model';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: JwtConfig,
    @Inject(GET_USER_BY_USERNAME_USE_CASE)
    private readonly getUserByUsername: GetByUsernameUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConf.secret,
    });
  }

  async validate(payload: JwtPayloadDto, done: VerifiedCallback) {
    if (!payload.username) {
      return done(null, new AnonymousUser());
    }
    const user = await this.getUserByUsername.getByUsername(payload.username);
    return done(null, new AuthenticatedUser(user.username, user.id));
  }
}
