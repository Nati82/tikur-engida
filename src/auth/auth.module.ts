import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
