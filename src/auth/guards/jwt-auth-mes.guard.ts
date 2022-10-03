import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MessageService } from "src/message/message.service";

@Injectable()
export class JwtAuthGuardMess extends AuthGuard(['jwt', 'jwtRenter']) {

    constructor(private messageService: MessageService) {
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
    this.messageService.socket.user = user; 
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}