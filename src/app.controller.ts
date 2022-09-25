import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notification/notification.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private notificationService: NotificationService) {}

  @Get()
  @Redirect('/api')
  getHello(): string {
    console.log('from app', this.notificationService.socket);
    return this.appService.getHello();
  }
}
