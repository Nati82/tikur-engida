import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log('args', context.getClass())
    console.log('type', context.getType())
    const { user } = context.switchToHttp().getRequest() || context.switchToWs().getClient();
    
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}