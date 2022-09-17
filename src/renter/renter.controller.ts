import {
    Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuardRenter } from 'src/auth/guards/jwt-auth-renter.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ChangePasswordDTO } from 'src/common/dtos/change-password.dto';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';
import { Role } from 'src/common/roles.enum';
import { RenterService } from './renter.service';

@ApiTags('renter')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('renter')
export class RenterController {
  constructor(private renterService: RenterService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDTO })
  @Post('signup')
  @UseInterceptors(FileInterceptor('profilePic'))
  async signUp(@Request() req: any, @UploadedFile() file: Express.Multer.File, @Body() renter: CreateUserDTO) {
    const { fileValidationError } = req;

    return this.renterService.createRenter(renter, file, fileValidationError);
  }

  @Roles(Role.RENTER)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { user } = req;
    return this.renterService.findRenterByUname(user.username);
  }

  @Roles(Role.RENTER)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @Patch('updateRenter')
  async updateRenter(@Request() req, @Body() updateUser: UpdateUserDTO) {
    const { user } = req;
    return this.renterService.updateRenter(user.id, updateUser);
  }

  @Roles(Role.RENTER)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @Patch('changePassRenter')
  async changePassAdmin(
    @Request() req,
    @Body() changePassword: ChangePasswordDTO,
  ) {
    const { user } = req;
    return this.renterService.changePassRenter(user.id, changePassword.password);
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuardRenter, RolesGuard)
  @Delete('deleteRenter')
  async deleteAdmin(@Request() req) {
    const { user } = req;
    return this.renterService.deleteRenter(user.id);
  }
}
