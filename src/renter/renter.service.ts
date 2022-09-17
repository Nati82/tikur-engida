import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

import { Renter } from './entities/renter.entity';

@Injectable()
export class RenterService {
  constructor(
    @InjectRepository(Renter) private RenterRepository: Repository<Renter>,
  ) {}

  async findRenterById(id: string) {
    return this.RenterRepository.findOne({ where: { Id: id } });
  }

  async findRenterByUname(username: string) {
    return this.RenterRepository.findOne({ where: { username } });
  }

  async createRenter(
    newRenter: Partial<Renter>,
    file: Express.Multer.File,
    fileValidationError: string,
  ) {
    const userExists = await this.findRenterByUname(newRenter.username);
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
    newRenter.password = await bcrypt.hash(newRenter.password, 10);
    newRenter.profilePic = `${file.destination}/${file.filename}`;

    const tempRenter = this.RenterRepository.create(newRenter);
    const renter = await this.RenterRepository.save(tempRenter);

    if (renter) {
      return renter;
    }

    await fs.promises.rm(`./files/${renter.username}/profile`, {
      recursive: true,
      force: true,
    });

    throw new BadRequestException({ message: 'signup unsuccessful' });
  }

  async updateRenter(id: string, renterParams: Partial<Renter>) {
    const { affected } = await this.RenterRepository.createQueryBuilder(
      'renters',
    )
      .update()
      .set({
        ...renterParams,
      })
      .where('renters.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.RenterRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update unsuccessful' });
  }

  async changePassRenter(id: string, newPassword: string) {
    newPassword = await bcrypt.hash(newPassword, 10);

    const { affected } = await this.RenterRepository.createQueryBuilder(
      'renters',
    )
      .update()
      .set({
        password: newPassword,
      })
      .where('renters.id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.RenterRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update unsuccessful' });
  }

  async deleteRenter(id: string) {
    const { affected } = await this.RenterRepository.delete(id);
    if (affected && affected > 0) {
      return { message: 'delete successfuly' };
    }
    throw new BadRequestException({ message: 'delete unsuccessful' });
  }
}
