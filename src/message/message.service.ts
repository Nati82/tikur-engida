import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private messageRepository: Repository<Message>) {}

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

    async getMessageWithOtherUser(myId: string, otherUserId: string) {}
}
