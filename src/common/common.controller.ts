import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @ApiQuery({ name: 'file-path' })
  @Get('images')
  async getImages(@Query('file-path') filePath :string, @Res() res: any) {
    const fPath = filePath.slice(1, filePath.length);
    console.log("filePath", `${process.cwd()}${fPath}`)
    const file = createReadStream(
        `${process.cwd()}${fPath}`,
    );
    file.pipe(res);
  }
}
