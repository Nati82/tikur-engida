import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notification/notification.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/api')
  getHello(): string {
    return this.appService.getHello();
  }
}
