import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { Tenant } from 'src/tenant/entities/tenat.entity';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    MulterModule.register({
      storage: diskStorage({
        destination: async function (req, _file, cb) {
          const user = req.body['username']
            ? req.body['username']
            : req.user['username'];
          await fs.promises.mkdir(`./files/tenant/${user}/profile`, {
            recursive: true,
          });
          cb(null, `./files/tenant/${user}/profile`);
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
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
