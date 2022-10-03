import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardNotif } from 'src/auth/guards/jwt-auth-notif.guard';
import { Role } from 'src/common/roles.enum';
import { NotificationService } from './notification.service';
import { SocketRolesGuard } from 'src/auth/guards/soc-roles.guard';

@WebSocketGateway(4002, {cors: true, namespace: 'notification' })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private notificationService: NotificationService) {}

  afterInit(server: any) {
    this.notificationService.socket = server;
    console.log('notification-socket', this.notificationService.socket);
  }

  handleConnection(client: any, ...args: any[]) {
      console.log('message_connected', client);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardNotif, SocketRolesGuard)
  @SubscribeMessage('NOTIFICATION')
  handleMessage(_client: any, _payload: any): string {
    return 'connected to notification gateway!';
  }
}
