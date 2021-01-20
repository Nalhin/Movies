import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './adapter/in/web/auth.controller';
import { jwtConfig } from '../core/config/jwt.config';
import { JwtStrategy } from './adapter/in/auth-strategy/Jwt.strategy';
import { UserPersistenceModule } from './adapter/out/persistance/user-persistence.module';
import { SIGN_UP_USER_USE_CASE } from './application/port/in/command/sign-up-user.use-case';
import { SignUpUserService } from './application/services/command/sign-up-user.service';
import { SAVE_USER_PORT } from './application/port/out/command/save-user.port';
import { UserPersistenceCommandAdapter } from './adapter/out/persistance/user-persistance-command.adapter';
import { EXISTS_BY_USERNAME_OR_EMAIL_PORT } from './application/port/out/query/exists-by-username-or-email.port';
import { UserPersistenceQueryAdapter } from './adapter/out/persistance/user-persistence-query.adapter';
import { GET_USER_BY_USERNAME_PORT } from './application/port/out/query/get-user-by-username.port';
import { TOKEN_PROVIDER_PORT } from './application/port/out/query/token-provider.port';
import { TokenProviderAdapter } from './adapter/out/token/token-provider.adapter';
import { TokenProviderModule } from './adapter/out/token/token-provider.module';
import { GetUserByUsernameService } from './application/services/query/get-user-by-username.service';
import { GET_USER_BY_USERNAME_USE_CASE } from './application/port/in/query/get-by-username.use-case';
import { LOGIN_USER_USE_CASE } from './application/port/in/command/login-user.use-case';
import { LoginUserService } from './application/services/command/login-user.service';
import { UserController } from './adapter/in/web/user.controller';

@Module({
  imports: [
    TokenProviderModule,
    UserPersistenceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    JwtStrategy,
    {
      provide: SIGN_UP_USER_USE_CASE,
      useClass: SignUpUserService,
    },
    {
      provide: SAVE_USER_PORT,
      useClass: UserPersistenceCommandAdapter,
    },
    {
      provide: LOGIN_USER_USE_CASE,
      useClass: LoginUserService,
    },
    {
      provide: EXISTS_BY_USERNAME_OR_EMAIL_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: GET_USER_BY_USERNAME_PORT,
      useClass: UserPersistenceQueryAdapter,
    },
    {
      provide: TOKEN_PROVIDER_PORT,
      useClass: TokenProviderAdapter,
    },
    {
      provide: GET_USER_BY_USERNAME_USE_CASE,
      useClass: GetUserByUsernameService,
    },
  ],
  controllers: [AuthController, UserController],
})
export class UserModule {}
