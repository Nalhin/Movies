import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { JwtConfig, jwtConfig } from '../../../../../core/config/jwt.config';
import {
  FIND_USER_BY_USERNAME_USE_CASE,
  FindUserByUsernameUseCase,
} from '../../../../application/port/in/query/find-user-by-username-use.case';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import {
  AnonymousUser,
  AppUser,
  AuthenticatedUser,
} from '../../../../../common/model/app-user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: JwtConfig,
    @Inject(FIND_USER_BY_USERNAME_USE_CASE)
    private readonly getUserByUsername: FindUserByUsernameUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConf.secret,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<AppUser> {
    if (!payload.username) {
      return new AnonymousUser();
    }
    return pipe(
      await this.getUserByUsername.getByUsername(payload.username),
      O.fold(
        () => new AnonymousUser(),
        (u) => new AuthenticatedUser(u.username, u.id),
      ),
    );
  }
}
