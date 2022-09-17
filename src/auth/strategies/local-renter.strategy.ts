import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategyRenter extends PassportStrategy(Strategy, 'localRenter') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const renter = await this.authService.validateRenter(username, password);
    if (!renter) {
      throw new UnauthorizedException({ message: 'please signup first' });
    }
    else if(!renter.status) {
        throw new UnauthorizedException({ message: 'you have not been approved yet' });
    }
    return renter;
  }
}