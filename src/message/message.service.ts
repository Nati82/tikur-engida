import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getMyMessages(userId: string, page: number) {
    const count = await this.messageRepository.count();

    if (count === 0) {
      return { message: 'you have no messages yet' };
    }
    console.log('count', count);

    return this.messageRepository
      .createQueryBuilder('Messages')
      .where('Messages.senderId = :userId', { userId })
      .orWhere('Messages.receiverId = :userId', { userId })
      .distinctOn(['Messages.senderId', 'Messages.receiverId'])
      .take(50)
      .skip((page - 1) * 50)
      .getMany();
  }

  async getMessageWithUser(myId: string, otherUserId: string, page: number) {
    const count = await this.messageRepository.count();

    if (count === 0) {
      return { message: 'you have no messages yet' };
    }
    
    return this.messageRepository
      .createQueryBuilder('Messages')
      .where(
        'Messages.senderId = :myId AND Messages.receiverId = :otherUserId',
        { myId, otherUserId },
      )
      .orWhere(
        'Messages.senderId = :otherUserId AND Messages.receiverId = :myId',
        { otherUserId, myId },
      )
      .orderBy('Messages.date', 'DESC')
      .take(50)
      .skip((page - 1) * 50)
      .getMany();
  }

  async addMessage(newMessage: Partial<Message>) {
    const tempMessage = this.messageRepository.create(newMessage);
    return this.messageRepository.save(tempMessage);
  }

  async updateMessage(messageId: string, message: string) {
    const { affected } = await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({
        message,
      })
      .where('Messages.Id = :messageId', { messageId })
      .execute();

    if (affected && affected > 0) {
      return this.messageRepository.findOne({ where: { Id: messageId } });
    }

    throw new BadRequestException({ message: 'update message unsuccessful' });
  }

  async deleteMessage(messageId: string) {
    const { affected } = await this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('Messages.Id = :messageId', { messageId })
      .execute();

    if (affected && affected > 0) {
      return { message: 'deleted message successfully' };
    }

    throw new BadRequestException({ message: 'delete message unsuccessful' });
  }
}
