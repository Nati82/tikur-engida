import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Patch,
  ClassSerializerInterceptor,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';
import { AdminService } from './admin.service';
import { ChangePasswordDTO } from '../common/dtos/change-password.dto';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { RenterService } from 'src/renter/renter.service';
import { UpdateRenterDTO } from '../renter/dtos/update-renter.dto';

@ApiTags('admin')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService, private renterService: RenterService) {}

  @ApiBody({ type: CreateAdminDTO })
  @Post('signup')
  async signUp(@Body() admin: CreateAdminDTO) {
    return this.adminService.createAdmin(admin);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { user } = req;
    return this.adminService.findAdminByUname(user.username);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('updateAdmin')
  async updateAdmin(@Request() req, @Body() updateAdmin: UpdateAdminDTO) {
    const { user } = req;
    return this.adminService.updateAdmin(user.id, updateAdmin);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('changePassAdmin')
  async changePassAdmin(
    @Request() req,
    @Body() changePassAdmin: ChangePasswordDTO,
  ) {
    const { user } = req;
    return this.adminService.changePassAdmin(user.id, changePassAdmin.password);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteAdmin')
  async deleteAdmin(@Request() req) {
    const { user } = req;
    return this.adminService.deleteAdmin(user.id);
  }
}
