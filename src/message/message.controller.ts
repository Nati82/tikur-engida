import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiParam({ name: 'page', type: 'number' })
  @Get('getMessages')
  async getMessages(@Req() req: any, @Param('page') page: number) {
    const { user } = req;
    return this.messageService.getMyMessages(user.Id, page);
  }
}
