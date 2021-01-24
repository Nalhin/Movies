import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './core/config/typerom.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './core/config/jwt.config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ExcludePropertiesClassSerializerInterceptor } from './common/interceptors/exclude-properties-class-serializer-interceptor.service';
import { MovieModule } from './movie/movie.module';
import { RequireAuthGuard } from './common/guards/require-auth.guard';
import { SelfValidationErrorFilter } from './common/filter/self-validation-error.filter';
import { SelfValidationError } from './common/self-validating/self-validating';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      envFilePath: '.env',
      ignoreEnvFile: !!process.env.CI,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    MovieModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
          throw SelfValidationError.fromValidationError(errors);
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludePropertiesClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RequireAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: SelfValidationErrorFilter,
    },
  ],
})
export class AppModule {}
