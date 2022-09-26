import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { In, Repository } from 'typeorm';
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
    
    async markAsSeen(notificationIds: string[]) {
        const { affected } = await this.notificationRepository
          .createQueryBuilder()
          .update(Notification)
          .set({
            seen: true,
          })
          .where('Id IN (:...notificationId)', { notificationId: notificationIds })
          .execute();
          
        if (affected && affected > 0) {
          return this.notificationRepository.find({where: { Id: In(notificationIds)} })
        }
    
        throw new BadRequestException({ message: 'update message unsuccessful' });
      }
}
