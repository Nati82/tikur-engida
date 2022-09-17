import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenterModule } from './renter/renter.module';
import { TenantModule } from './tenant/tenant.module';
import { AdminModule } from './admin/admin.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/entities/Admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renter } from './renter/entities/renter.entity';
import { Tenant } from './tenant/entities/tenat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: ' ',
      database: 'TikurEngida',
      entities: [Admin, Renter, Tenant],
      synchronize: true,
    }),
    RenterModule,
    TenantModule,
    AdminModule,
    MessageModule,
    RoomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
