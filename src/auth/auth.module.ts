import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategyAdmin } from './strategies/local-admin.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt-common.strategy';
import { RenterModule } from 'src/renter/renter.module';
import { LocalStrategyRenter } from './strategies/local-renter.strategy';
import { JwtStrategyRenter } from './strategies/jwt-renter.strategy';
import { TenantModule } from 'src/tenant/tenant.module';
import { LocalStrategyTenant } from './strategies/local-tenant.strategy';
import { JwtAuthGuardJoined } from './guards/jwt-auth-joined.guard';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    AdminModule,
    RenterModule,
    TenantModule,
  ],
  providers: [
    AuthService,
    LocalStrategyAdmin,
    LocalStrategyRenter,
    LocalStrategyTenant,
    JwtStrategy,
    JwtStrategyRenter,
    JwtAuthGuardJoined
  ],
  controllers: [AuthController],
})
export class AuthModule {}
