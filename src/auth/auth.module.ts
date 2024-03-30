import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.strategy';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: "ratulratulratulratul",
      signOptions: {
        expiresIn: '10m'
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  controllers: [AuthController, ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes()
  }
}

/*
    {
      path: 'auth',
      method: RequestMethod.GET
    }

*/