import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Admin } from './entities/Admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private AdminRepository: Repository<Admin>,
  ) {}

  async findAdminByUname(username: string) {
    return this.AdminRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findAdminById(id: string) {
    return this.AdminRepository.findOne({
        where: {
            Id: id
        }
    })
  }

  async createAdmin(newAdmin: Partial<Admin>) {
    const saltOrRounds = 10;
    newAdmin.password = await bcrypt.hash(newAdmin.password, saltOrRounds);

    const tempAdmin = this.AdminRepository.create(newAdmin);
    const admin = await this.AdminRepository.save(tempAdmin);

    if (admin) {
      return admin;
    }

    throw new BadRequestException({ message: 'signup unsuccessful' });
  }

  async updateAdmin(id: string, adminParams: Partial<Admin>) {
    const { affected } = await this.AdminRepository.createQueryBuilder('admins')
      .update()
      .set({
        ...adminParams,
      })
      .where('admins.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.AdminRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update admin unsuccessful' });
  }

  async changePassAdmin(id: string, newPassword: string) {
    newPassword = await bcrypt.hash(newPassword, 10);

    const { affected } = await this.AdminRepository.createQueryBuilder('admins')
      .update()
      .set({
        password: newPassword,
      })
      .where('admins.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.AdminRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update admin unsuccessful' });
  }

  async deleteAdmin(id: string) {
    const { affected } = await this.AdminRepository.delete(id);
    if (affected && affected > 0) {
      return { message: 'admin deleted successfuly' };
    }
    throw new BadRequestException({ message: 'delete admin unsuccessful' });
  }
}
