import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class JwtAuthGuardNotif extends AuthGuard(['jwt', 'jwtRenter']) {

    constructor(private notificationService: NotificationService) {
        super();
    }

  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient(); // possibly `getData()` instead.
    return {
      headers: {
        authorization: `Bearer ${ws.handshake.auth.Bearer}`,
      }
    }
  }
  
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    this.notificationService.socket.user = user; 
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}