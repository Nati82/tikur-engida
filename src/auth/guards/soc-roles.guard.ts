import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/roles.enum';
import { MessageService } from 'src/message/message.service';
import { NotificationService } from 'src/notification/notification.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class SocketRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private notificationService: NotificationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = this.notificationService.socket;
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
