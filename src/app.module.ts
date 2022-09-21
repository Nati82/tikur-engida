import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenterModule } from './renter/renter.module';
import { TenantModule } from './tenant/tenant.module';
import { AdminModule } from './admin/admin.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renter } from './renter/entities/renter.entity';
import { Tenant } from './tenant/entities/tenat.entity';
import { Room } from './room/entities/room.entity';
import { Booking } from './room/entities/booking.entity';
import { Comment } from './room/entities/comment.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Tikur-Engida',
      password: 'Tikur',
      database: 'TikurEngida',
      entities: [Admin, Renter, Tenant, Room, Booking, Comment],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    RenterModule,
    TenantModule,
    AdminModule,
    MessageModule,
    RoomModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
