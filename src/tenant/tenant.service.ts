import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

import { Tenant } from './entities/tenat.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  ) {}

  async findTenantById(id: string) {
    return this.tenantRepository.findOne({ where: { Id: id } });
  }

  async findTenantByUname(username: string) {
    return this.tenantRepository.findOne({ where: { username } });
  }

  async createTenant(
    newTenant: Partial<Tenant>,
    file: Express.Multer.File,
    fileValidationError: string,
  ) {
    const userExists = await this.findTenantByUname(newTenant.username);
    if (userExists) {
      throw new BadRequestException({
        message: 'username already exists',
      });
    }

    if (fileValidationError && fileValidationError.length) {
      throw new BadRequestException({
        message: fileValidationError,
      });
    }
    newTenant.password = await bcrypt.hash(newTenant.password, 10);
    newTenant.profilePic = `${file.destination}/${file.filename}`;

    const tempTenant = this.tenantRepository.create(newTenant);
    const tenant = await this.tenantRepository.save(tempTenant);

    if (tenant) {
      return tenant;
    }

    await fs.promises.rm(`./files/${tenant.username}/profile`, {
      recursive: true,
      force: true,
    });

    throw new BadRequestException({ message: 'signup unsuccessful' });
  }

  async updateTenant(id: string, tenantParams: Partial<Tenant>) {
    const { affected } = await this.tenantRepository.createQueryBuilder(
      'tenants',
    )
      .update()
      .set({
        ...tenantParams,
      })
      .where('tenants.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.tenantRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update unsuccessful' });
  }

  async changePassTenant(id: string, newPassword: string) {
    newPassword = await bcrypt.hash(newPassword, 10);

    const { affected } = await this.tenantRepository.createQueryBuilder(
      'renters',
    )
      .update()
      .set({
        password: newPassword,
      })
      .where('renters.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.tenantRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update unsuccessful' });
  }

  async deleteTenant(id: string) {
    const { affected } = await this.tenantRepository.delete(id);
    if (affected && affected > 0) {
      return { message: 'delete successfuly' };
    }
    throw new BadRequestException({ message: 'delete unsuccessful' });
  }
}

