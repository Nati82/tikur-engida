import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Comment } from './entities/comment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Booking, Comment]),
    MulterModule.register({
      storage: diskStorage({
        destination: async function (req, _file, cb) {
          const user = req.body['username']
            ? req.body['username']
            : req.user['username'];
          await fs.promises.mkdir(`./files/renter/${user}/rooms`, {
            recursive: true,
          });
          cb(null, `./files/renter/${user}/rooms`);
        },
        filename: (_req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
          req.fileValidationError = 'only image files are allowed!';
          return cb(null, false);
        }

        cb(null, true);
      },
    }),
    NotificationModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
