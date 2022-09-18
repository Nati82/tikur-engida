import { Body, Controller, Patch, UseGuards, Request, UseInterceptors, UploadedFiles, Post, Get, Param, Delete } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardRenter } from 'src/auth/guards/jwt-auth-renter.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoomDTO } from 'src/room/dtos/add-room.dto';
import { Role } from 'src/common/roles.enum';
import { RoomService } from './room.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuardJoined } from 'src/auth/guards/jwt-auth-joined.guard';
import { UpdateRoomDTO } from './dtos/update-room.dto';
import { AddCommentDTO } from './dtos/add-comment.dto';
import { RequestBookingDTO } from './dtos/request-booking.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Roles(Role.RENTER)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @UseInterceptors(FilesInterceptor('profilePic'))
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
  @Get('viewRooms/:roomId')
  async viewRoom(@Param() roomId: string) {
    return this.roomService.viewRoom(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Get('viewRoomsByRenter/:renterId')
  async viewRoomByRenter(@Param() renterId: string) {
    return this.roomService.viewRoomByRenter(renterId);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Patch('updateRoom/:roomId')
  async updateRoom(@Param() roomId: string, @Body() roomParams : UpdateRoomDTO) {
    return this.roomService.updateRoom(roomId, roomParams);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Delete('deleteRoom/:roomId')
  async deleteRoom(@Param() roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER, Role.TENANT)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Get('viewComment/:roomId')
  async viewComment(@Param() roomId: string,) {
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
  @Get('viewBookingRequest/:roomId')
  async viewBookingRequest(@Param() roomId: string) {
    return this.roomService.viewBookingRequest(roomId);
  }

  @Roles(Role.ADMIN, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Patch('acceptBookingRequest/:roomId')
  async acceptBookingRequest(@Param() roomId: string) {
    return this.roomService.acceptBookingRequest(roomId);
  }

  @Roles(Role.ADMIN, Role.TENANT, Role.RENTER)
  @UseGuards(JwtAuthGuardJoined, RolesGuard)
  @Post('addBookingRequest/:roomId')
  async addBookingRequest(@Body() booking: RequestBookingDTO) {
    return this.roomService.addBookingRequest(booking);
  }
}
