import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as util from 'util';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @ApiQuery({ name: 'file-path' })
  @Header('Content-Type', 'image/jpeg')
  @Get('images')
  async getImages(@Query('file-path') filePath: string, @Res() res: any) {
    const fPath = filePath.slice(1, filePath.length);

    const file = fs.createReadStream(`${process.cwd()}${fPath}`);
    file.pipe(res);
    
    file.on('error', (e) => { 
        res.format({'application/json' () { res.status(400).json({message: e.message})}});
    })
  }
}
