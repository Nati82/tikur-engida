import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyTenant extends PassportStrategy(Strategy, 'localTenant') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const tenant = await this.authService.validateTenant(username, password);
    if (!tenant) {
      throw new UnauthorizedException({ message: 'please signup first' });
    }
    return tenant;
  }
}