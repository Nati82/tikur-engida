import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('loginAdmin')
  @ApiBody({type: LoginDTO})
  async loginAdmin(@Request() req) {
    return this.authService.login(req.user);
  }
}
