import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async findAdminByUname(username: string) {
    return this.adminRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findAdminById(id: string) {
    return this.adminRepository.findOne({
        where: {
            Id: id
        }
    })
  }

  async createAdmin(newAdmin: Partial<Admin>) {
    const adminExists = await this.findAdminByUname(newAdmin.username);

    if(adminExists) {
      throw new BadRequestException({ message: 'username already exist' });
    }
    newAdmin.password = await bcrypt.hash(newAdmin.password, 10);

    const tempAdmin = this.adminRepository.create(newAdmin);
    const admin = await this.adminRepository.save(tempAdmin);

    if (admin) {
      return admin;
    }

    throw new BadRequestException({ message: 'signup unsuccessful' });
  }

  async updateAdmin(id: string, adminParams: Partial<Admin>) {
    const { affected } = await this.adminRepository.createQueryBuilder('admins')
      .update()
      .set({
        ...adminParams,
      })
      .where('admins.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.adminRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update admin unsuccessful' });
  }

  async changePassAdmin(id: string, newPassword: string) {
    newPassword = await bcrypt.hash(newPassword, 10);

    const { affected } = await this.adminRepository.createQueryBuilder('admins')
      .update()
      .set({
        password: newPassword,
      })
      .where('admins.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.adminRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update admin unsuccessful' });
  }

  async deleteAdmin(id: string) {
    const { affected } = await this.adminRepository.delete(id);
    if (affected && affected > 0) {
      return { message: 'admin deleted successfuly' };
    }
    throw new BadRequestException({ message: 'delete admin unsuccessful' });
  }
}
