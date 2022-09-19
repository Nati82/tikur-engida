import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

import { Booking } from './entities/booking.entity';
import { Room } from './entities/room.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async viewRooms() {
    return this.roomRepository.find();
  }

  async viewRoomByRenter(renterId: string) {
    return this.roomRepository.find({
      where: {
        renterId,
      },
    });
  }

  async viewRoom(id: string) {
    return this.roomRepository.findOne({
      where: {
        Id: id,
      },
    });
  }

  async postRoom(
    username: string,
    newRoom: Partial<Room>,
    files: Array<Express.Multer.File>,
    fileValidationError: string,
  ) {
    if (fileValidationError && fileValidationError.length) {
      throw new BadRequestException({
        message: fileValidationError,
      });
    }
    newRoom.pictures = new Array();
    files.forEach((f) =>
      newRoom.pictures.push(`${f.destination}/${f.filename}`),
    );

    const tempRoom = this.roomRepository.create(newRoom);
    const room = await this.roomRepository.save(tempRoom);

    if (room) {
      return room;
    }

    for await (const f of files) {
      await fs.promises.rm(`./files/renter/${username}/rooms/${f.filename}`, {
        recursive: true,
        force: true,
      });
    }

    throw new BadRequestException({ message: 'add room unsuccessful' });
  }

  async updateRoom(id: string, roomParams: Partial<Room>) {
    const { affected } = await this.roomRepository
      .createQueryBuilder()
      .update(Room)
      .set({
        ...roomParams,
      })
      .where('Id = :id', { id })
      .execute();

    if (affected !== 0) {
      return this.roomRepository.findOne({
        where: {
          Id: id,
        },
      });
    }

    throw new BadRequestException({ message: 'update unsuccessful' });
  }

  async deleteRoom(id: string) {
    const { affected } = await this.roomRepository.delete(id);
    if (affected && affected > 0) {
      return { message: 'deleted successfuly' };
    }
    throw new BadRequestException({ message: 'delete unsuccessful' });
  }

  async viewComment(roomId: string) {
    return this.commentRepository.find({
      where: {
        roomId,
      },
    });
  }

  async addComment(newComment: Partial<Comment>) {
    const roomExists = await this.viewRoom(newComment.roomId);

    if (!roomExists) {
      throw new BadRequestException({
        message: 'the room you are trying to comment on does not exist',
      });
    }

    const tempComment = this.commentRepository.create(newComment);
    const comment = await this.commentRepository.save(tempComment);

    if (!comment) {
      throw new BadRequestException({
        message: 'comment unsuccessful please try again',
      });
    }

    return comment;
  }

  async viewBookingRequest(roomId: string) {
    return this.bookingRepository.find({
      where: {
        roomId,
      },
    });
  }

  async acceptBookingRequest(roomId: string, bookingReqId: string) {
    const roomExists = await this.viewRoom(roomId);
    const bookingReqIdExists = await this.bookingRepository.findOne({ where: { Id: bookingReqId }});

    if (!roomExists) {
      throw new BadRequestException({
        message: 'the room you are trying to comment on does not exist',
      });
    }

    const { affected } = await this.roomRepository
      .createQueryBuilder()
      .update(Room)
      .set({
        reserved: true,
        from: bookingReqIdExists.from,
        to: bookingReqIdExists.to
      })
      .where('Id = :roomId', { roomId })
      .execute();

    if (affected && affected > 0) {
      const res = (await this.bookingRepository.delete(roomId)).affected;
      if (res && res > 0) {
        return this.viewRoom(roomId);
      }
    }

    throw new BadRequestException({ message: 'reserve unsuccessful' });
  }

  async addBookingRequest(newBooking: Partial<Booking>) {
    const roomExists = await this.viewRoom(newBooking.roomId);
    const bookingExists = await this.bookingRepository.findOne({
      where: { tenantId: newBooking.tenantId },
    });

    if (bookingExists) {
      return bookingExists;
    }

    if (!roomExists) {
      throw new BadRequestException({
        message: 'the room you are trying to comment on does not exist',
      });
    }

    const tempBooking = this.bookingRepository.create(newBooking);
    const booking = await this.bookingRepository.save(tempBooking);

    if (booking) {
      return booking;
    }

    throw new BadRequestException({
      message: 'booking failed please try again',
    });
  }
}
