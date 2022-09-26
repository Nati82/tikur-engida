import { UseGuards } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardMess } from 'src/auth/guards/jwt-auth-mes.guard';
import { SocMessRolesGuard } from 'src/auth/guards/soc-mess-roles.guard';
import { Role } from 'src/common/roles.enum';
import { AddMessageDTO } from './dtos/add-message.dto';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { MessageType } from './message.enum';
import { MessageService } from './message.service';

@WebSocketGateway(4002, {namespace: 'message'})
export class MessageGateway implements OnGatewayInit{
  constructor(private messageService: MessageService) {}

  afterInit(server: any) {
      this.messageService.socket = server;
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardMess, SocMessRolesGuard)
  @SubscribeMessage(MessageType.SEND_MESSAGE)
  async sendMessage(_client: any, payload: AddMessageDTO) {
    try {
      const message = await this.messageService.addMessage(payload);
      if(message) {
          this.messageService.socket.emit(MessageType.RECEIVE_MESSAGE, {message: message});
          return {message};
      }
    }
    catch (e) {
      console.log('e', e);
      throw new WsException({message: 'message not sent'})
    }
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardMess, SocMessRolesGuard)
  @SubscribeMessage(MessageType.SEND_UPDATE_MESSAGE)
  async updateMessage(_client: any, payload: {messageId: string, message: string}) {
    try {
      const { messageId, message } = payload;
      const updateMessage = await this.messageService.updateMessage(messageId, message);
      if(updateMessage) {
          this.messageService.socket.emit(MessageType.RECEIVE_UPDATED_MESSAGE, {message: updateMessage});
          return {message: updateMessage};
      }
    }
    catch (e) {
      console.log('e', e);
      throw new WsException({message: 'message not sent'})
    }
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardMess, SocMessRolesGuard)
  @SubscribeMessage(MessageType.SEND_UPDATE_MESSAGE)
  async markAsSeen(_client: any, payload: {messageIds: string[]}) {
    try {
      const { messageIds } = payload;
      const updateMessage = await this.messageService.markAsSeen(messageIds);
      if(updateMessage) {
          this.messageService.socket.emit(MessageType.RECEIVE_MESSAGE_SEEN, {message: updateMessage});
          return {message: updateMessage};
      }
    }
    catch (e) {
      console.log('e', e);
      throw new WsException({message: 'message not sent'})
    }
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardMess, SocMessRolesGuard)
  @SubscribeMessage(MessageType.SEND_DELETE_MESSAGE)
  async deleteMessage(_client: any, payload: {messageId: string}) {
    try {
      const { messageId } = payload;
      const deletedMessage = await this.messageService.deleteMessage(messageId);
      if(deletedMessage) {
          this.messageService.socket.emit(MessageType.RECEIVE_DELETED_MESSAGE, deletedMessage);
          return deletedMessage;
      }
    }
    catch (e) {
      console.log('e', e);
      throw new WsException({message: 'message not sent'})
    }
  }
}
