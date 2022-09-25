import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminService } from 'src/admin/admin.service';
import { RenterService } from 'src/renter/renter.service';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private renterService: RenterService,
    private tenantService: TenantService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findAdminByUname(username);

    const res = await bcrypt.compare(pass, admin.password);
    if (admin && res) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async validateRenter(username: string, pass: string): Promise<any> {
    const renter = await this.renterService.findRenterByUname(username);
    if(!renter){
      return null;
    }
    const res = await bcrypt.compare(pass, renter.password);

    if (res) {
      const { password, ...result } = renter;
      return result;
    }
    return null;
  }

  async validateTenant(username: string, pass: string): Promise<any> {
    const tenant = await this.tenantService.findTenantByUname(username);

    const res = await bcrypt.compare(pass, tenant.password);
    
    if (tenant && res) {
      const { password, ...result } = tenant;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.Id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async loginRenter(user: any) {
    const payload = { username: user.username, sub: user.Id, role: user.role, status: user.status };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
