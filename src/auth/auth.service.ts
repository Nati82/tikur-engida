import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(private adminService: AdminService, private jwtService: JwtService){}
    
    async validateAdmin(username: string, pass: string): Promise<any> {
        console.log('username', username, 'password', pass);
        const admin = await this.adminService.findAdminByUname(username);
        console.log('admin', admin)

        const res = await bcrypt.compare(pass, admin.password);
        console.log('res', res);
        if (admin && res) {
          const { password, ...result } = admin;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.username, sub: user.Id, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
          user
        };
      }
}
