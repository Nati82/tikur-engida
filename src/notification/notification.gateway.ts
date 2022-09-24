import { UseFilters, UseGuards, WsExceptionFilter } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardSocket } from 'src/auth/guards/jwt-auth-joined-soc.guard';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';
import { Server } from 'typeorm';

@WebSocketGateway(4002, { namespace: 'notification' })
export class NotificationGateway {
  // @UseFilters(new WsExceptionFilter())
  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardSocket, RolesGuard)
  @SubscribeMessage('notification')
  handleMessage(client: any, payload: any): string {
    console.log('notification');
    // console.log('client', client);
    console.log('payload', payload);
    return 'Hello world!';
  }
}
