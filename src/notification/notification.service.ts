import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
    public socket: any;
    constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {}

    async getMyNotifications(receiverId: string) {
        return this.notificationRepository
        .createQueryBuilder('Notifications')
        .where('Notifications.receiverId = :receiverId', { receiverId })
        .andWhere('Notifications.seen = :seen', { seen: false })
        .orderBy('Notifications.date', 'DESC')
        .getMany()
    }

    async addNotification(newNotification: Partial<Notification>) {
        const tempNotification = this.notificationRepository.create(newNotification);
        const notification = await this.notificationRepository.save(tempNotification);
        
        if(notification) {
            this.socket.emit('NEW_NOTIFICATION', notification);
            return;
        }

        throw new WsException('could not create notification');
    }
}
