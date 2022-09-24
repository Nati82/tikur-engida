import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(4002, {namespace: 'message'})
export class MessageGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('message')
    // console.log('client', client);
    console.log('payload', payload);
    return 'Hello world!';
  }
}
