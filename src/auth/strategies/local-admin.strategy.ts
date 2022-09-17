import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyAdmin extends PassportStrategy(Strategy, 'localAdmin') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authService.validateAdmin(username, password);
    if (!admin) {
      throw new UnauthorizedException({ message: 'please signup first' });
    }
    return admin;
  }
}