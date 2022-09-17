import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { Renter } from './entities/renter.entity';
import { RenterController } from './renter.controller';
import { RenterService } from './renter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Renter]),
  MulterModule.register({
    storage: diskStorage({
      destination: async function (req, _file, cb) {
        const user = req.body['username']
          ? req.body['username']
          : req.user['username'];
        await fs.promises.mkdir(`./files/renter/${user}/profile`, {
          recursive: true,
        });
        cb(null, `./files/renter/${user}/profile`);
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
  }),],
  controllers: [RenterController],
  providers: [RenterService],
  exports: [RenterService]
})
export class RenterModule {}
