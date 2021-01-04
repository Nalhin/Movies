import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtConfig, jwtConfig } from '../../core/config/jwt.config';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    @Inject(jwtConfig.KEY)
    private jwtConf: JwtConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConf.secret,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    if (!payload.username) {
      return done(null, null);
    }
    const user = await this.userService.findOneByUsername(payload.username);
    return done(null, user);
  }
}
