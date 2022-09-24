import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuardSocket extends AuthGuard(['jwt', 'jwtRenter']) {

    private constext: any;

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
    console.log('usr', user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}