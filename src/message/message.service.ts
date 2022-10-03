import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType } from 'src/notification/notification-type.enum';
import { NotificationService } from 'src/notification/notification.service';
import { Brackets, In, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  public socket: any;
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private notificationService: NotificationService,
  ) {}

  async getMyMessages(userId: string, page: number) {
    const count = await this.messageRepository.count();

    if (count === 0) {
      return { message: 'you have no messages yet' };
    }

    const messages = await this.messageRepository
      .createQueryBuilder('Messages')
      .distinctOn(['Messages.senderId', 'Messages.receiverId'])
      .where('Messages.senderId = :userId', { userId })
      .orWhere('Messages.receiverId = :userId', { userId })
      .orderBy('Messages.senderId', 'ASC')
      .addOrderBy('Messages.receiverId', 'ASC')
      .addOrderBy('Messages.date', 'DESC')
      .take(50)
      .skip((page - 1) * 50)
      .getMany();

    let tempArray = [];

    for (const m of messages) {
      if (tempArray.length === 0) {
        tempArray = [messages[0]];
      } else {
        const v = tempArray.find(
          (t) =>
            (m.senderId === t.receiverId && m.receiverId === t.senderId) ||
            (m.senderId === t.senderId && m.receiverId === t.receiverId),
        );
        if (!v) {
          tempArray.push(m);
        }
      }
    }

    tempArray.sort((a, b) => b.date.getTime() - a.date.getTime());
    return tempArray;
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
    const message = await this.messageRepository.save(tempMessage);

    if (message) {
      this.notificationService.addNotification({
        receiverId: message.receiverId,
        type: NotificationType.NEW_MESSAGE,
      });
      return message;
    }

    throw new BadRequestException({ message: 'message not sent' });
  }

  async updateMessage(messageId: string, message: string) {
    const { affected } = await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({
        message,
      })
      .where('Id = :messageId', { messageId })
      .execute();

    if (affected && affected > 0) {
      return this.messageRepository.findOne({ where: { Id: messageId } });
    }

    throw new BadRequestException({ message: 'update message unsuccessful' });
  }

  async markAsSeen(messageIds: string[]) {
    const { affected } = await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({
        seen: true,
      })
      .where('Id IN (:...messageId)', { messageId: messageIds })
      .execute();
      
    if (affected && affected > 0) {
      return this.messageRepository.find({where: { Id: In(messageIds)} })
    }

    throw new BadRequestException({ message: 'update message unsuccessful' });
  }

  async deleteMessage(messageId: string) {
    const { affected } = await this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('Id = :messageId', { messageId })
      .execute();

    if (affected && affected > 0) {
      return { message: 'deleted message successfully' };
    }

    throw new BadRequestException({ message: 'delete message unsuccessful' });
  }
}
