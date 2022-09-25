import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';
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
}
