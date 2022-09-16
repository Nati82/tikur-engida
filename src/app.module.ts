import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenterModule } from './renter/renter.module';
import { TenantModule } from './tenant/tenant.module';
import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/entities/Admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: ' ',
      database: 'TikurEngida',
      entities: [Admin],
      synchronize: true,
    }),
    RenterModule,
    TenantModule,
    AdminModule,
    CommonModule,
    MessageModule,
    RoomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
