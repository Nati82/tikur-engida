import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getMyMessages(userId: string, page: number) {
    return this.messageRepository
      .createQueryBuilder('messages')
      .distinctOn(['messages.senderId', 'messages.receiverId'])
      .where('senderId = :userId', { userId })
      .orWhere('receiverId = :userId', { userId })
      .orderBy('messages.date', 'DESC')
      .take(50)
      .skip((page - 1) * 50)
      .getMany();
  }

  async getMessageWithUser(myId: string, otherUserId: string, page: number) {
    return this.messageRepository
    .createQueryBuilder('Messages')
    .where('Messages.senderId = : myId AND Messages.receiverId = : otherUserId', {myId, otherUserId})
    .orWhere('Messages.senderId = : otherUserId AND Messages.receiverId = : myId', {otherUserId, myId})
    .orderBy('messages.date', 'DESC')
    .take(50)
    .skip((page - 1) * 50)
    .getMany();
  }

  async addMessage(newMessage: Partial<Message>) {
    const tempMessage = this.messageRepository.create(newMessage);
    return this.messageRepository.save(tempMessage);
  }

  async updateMessage(messageId: string, message: string) {
    const { affected } = await this.messageRepository.createQueryBuilder()
    .update(Message)
      .set({
        message,
      })
      .where('Id = :messageId', { messageId })
      .execute();

      if(affected && affected > 0) {
        return this.messageRepository.findOne({ where: {Id: messageId }});
      }

      throw new BadRequestException({ message: 'update message unsuccessful' });
  }

  async deleteMessage(messageId: string) {
    const { affected } = await this.messageRepository.createQueryBuilder()
          .delete()
          .from(Message)
          .where('Id = :messageId', { messageId })
          .execute()

    if(affected && affected > 0) {
        return { message: 'deleted message successfully' };
    }

    throw new BadRequestException({ message: 'delete message unsuccessful' });
  }
}
