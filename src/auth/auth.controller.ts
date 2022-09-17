import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LocalAuthGuardAdmin } from './guards/local-admin-auth.guard';
import { LocalAuthGuardRenter } from './guards/local-renter-autth.guard';
import { LocalAuthGuardTenant } from './guards/local-tenant-auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuardAdmin)
  @Post('loginAdmin')
  @ApiBody({type: LoginDTO})
  async loginAdmin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuardRenter)
  @Post('loginRenter')
  @ApiBody({type: LoginDTO})
  async loginRenter(@Request() req) {
    return this.authService.loginRenter(req.user);
  }

  @UseGuards(LocalAuthGuardTenant)
  @Post('loginTenant')
  @ApiBody({type: LoginDTO})
  async loginTenant(@Request() req) {
    return this.authService.login(req.user);
  }
}
