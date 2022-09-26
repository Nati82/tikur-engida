import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';
import { AddMessageDTO } from './dtos/add-message.dto';
import { MarkAsSeenDTO } from './dtos/mark-as-seen.dto';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { MessageService } from './message.service';

@ApiTags('message')
@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({ name: 'page', type: 'number' })
  @Get('getMessages/:page')
  async getMessages(@Req() req: any, @Param('page') page: string) {
    const { user } = req;
    return this.messageService.getMyMessages(user.Id, parseInt(page));
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({ name: 'otherUserId'})
  @ApiParam({ name: 'page', type: 'number' })
  @Get('getMessageWithUser/:page/:otherUserId')
  async getMessagesWithUser(@Req() req: any, @Param('otherUserId') otherUserId: string, @Param('page') page: string) {
    const { user } = req;
    return this.messageService.getMessageWithUser(user.Id, otherUserId,parseInt(page));
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiBody({type: AddMessageDTO})
  @Post('sendMessage')
  async sendMessage(@Body() message: AddMessageDTO) {
    return this.messageService.addMessage(message);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'messageId'})
  @ApiBody({type: UpdateMessageDTO})
  @Patch('updateMessage/:messageId')
  async updateMessage(@Param('messageId') messageId, @Body() message: UpdateMessageDTO) {
    return this.messageService.updateMessage(messageId, message.message);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiBody({ type: MarkAsSeenDTO })
  @Patch('markAsSeen')
  async markAsSeen(@Body() messageIds: MarkAsSeenDTO) {
    return this.messageService.markAsSeen(messageIds.messageIds);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'messageId'})
  @Delete('deleteMessage/:messageId')
  async deleteMessage(@Param('messageId') messageId) {
    return this.messageService.deleteMessage(messageId);
  }

  
}
