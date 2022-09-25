import { Body, Controller, Patch, UseGuards, Request, UseInterceptors, UploadedFiles, Post, Get, Param, Delete, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardRenter } from 'src/auth/guards/jwt-auth-renter.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoomDTO } from 'src/room/dtos/add-room.dto';
import { Role } from 'src/common/roles.enum';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { UpdateRoomDTO } from './dtos/update-room.dto';
import { AddCommentDTO } from './dtos/add-comment.dto';
import { RequestBookingDTO } from './dtos/request-booking.dto';
import { ApproveRoomDTO } from './dtos/approve-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('room')
@ApiBearerAuth()
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Roles(Role.RENTER)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @UseInterceptors(FilesInterceptor('pictures'))
  @ApiConsumes('multipart/form-data')
  @Post('postRoom')
  async postRoom(@Request() req: any, @UploadedFiles() files: Array<Express.Multer.File>, @Body() room: AddRoomDTO) {
    const { user, fileValidationError } = req;
    return this.roomService.postRoom(user.username, room, files, fileValidationError);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Get('viewRooms')
  async viewRooms() {
    return this.roomService.viewRooms();
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Get('viewRooms/:roomId')
  async viewRoom(@Param('roomId') roomId: string) {
    return this.roomService.viewRoom(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'city'})
  @Get('viewRoomsByCity/:city')
  async viewRoomByCity(@Param('city') city: string) {
    return this.roomService.viewRoomByCity(city);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'renterId'})
  @Get('viewRoomsByRenter/:renterId')
  async viewRoomByRenter(@Param('renterId') renterId: string) {
    return this.roomService.viewRoomByRenter(renterId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Patch('approveRoom/:roomId')
  async approveRoom(@Param('roomId') roomId: string, @Body() roomParams : ApproveRoomDTO) {
    return this.roomService.updateRoom(roomId, roomParams);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Patch('updateRoom/:roomId')
  async updateRoom(@Param('roomId') roomId: string, @Body() roomParams : UpdateRoomDTO) {
    return this.roomService.updateRoom(roomId, roomParams);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Delete('deleteRoom/:roomId')
  async deleteRoom(@Param('roomId') roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Get('viewComment/:roomId')
  async viewComment(@Param('roomId') roomId: string,) {
    return this.roomService.viewComment(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Post('addComment/:roomId')
  async addComment(@Body() comment : AddCommentDTO) {
    return this.roomService.addComment(comment);
  }

  @Roles(Role.ADMIN, Role.TENANT, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @ApiParam({name: 'page', type: 'number'})
  @Get('viewBookingRequest/:roomId/:page')
  async viewBookingRequest(@Param('roomId') roomId: string, @Param('page') page: string) {
    return this.roomService.viewBookingRequest(roomId, parseInt(page));
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({name: 'page', type: 'number'})
  @Get('viewBookingReqTenant/:page')
  async viewBookingReqTenant(@Req() req: any, @Param('page') page: string) {
    const { user } = req;
    return this.roomService.viewBookingReqTenant(user.Id, parseInt(page));
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({name: 'page', type: 'number'})
  @Get('viewBookedRooms/:page')
  async viewBookedRooms(@Req() req: any, @Param('page') page: string) {
    const { user } = req;
    return this.roomService.viewBookedRooms(user.Id, parseInt(page));
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @ApiParam({name: 'bookingReqId'})
  @Patch('acceptBookingRequest/:roomId/:bookingReqId')
  async acceptBookingRequest(@Param('roomId') roomId: string, @Param('bookingReqId') bookingReqId: string) {
    return this.roomService.acceptBookingRequest(roomId, bookingReqId);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @ApiParam({name: 'roomId'})
  @Patch('cancelRoomReservation/:roomId')
  async cancelRoomReservation(@Param('roomId') roomId: string) {
    return this.roomService.cancelReserve(roomId);
  }

  @Roles(Role.ADMIN, Role.TENANT, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Post('addBookingRequest')
  async addBookingRequest(@Body() booking: RequestBookingDTO) {
    return this.roomService.addBookingRequest(booking);
  }
}
