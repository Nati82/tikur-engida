import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';
import { MarkAsSeenDTO } from './dtos/mark-as-seen.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
    @UseGuards(JwtAuthGuardJoined, RolesGuard)
    @ApiParam({name: 'myId', type: 'string'})
    @Get('getMyNotification/:myId')
    async getMyNotification(@Param('myId') myId: string) {
        return this.notificationService.getMyNotifications(myId)
    }

    @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
    @UseGuards(JwtAuthGuardJoined, RolesGuard)
    @ApiBody({ type: MarkAsSeenDTO })
    @Patch('markAsSeen')
    async markAsSeen(@Body() notificationIds: MarkAsSeenDTO) {
      return this.notificationService.markAsSeen(notificationIds.notificationIds);
    }
}
