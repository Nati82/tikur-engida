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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ChangePasswordDTO } from 'src/common/dtos/change-password.dto';
import { CreateUserDTO } from 'src/common/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';
import { Role } from 'src/common/roles.enum';
import { TenantService } from './tenant.service';

@ApiTags('tenant')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDTO })
  @Post('signup')
  @UseInterceptors(FileInterceptor('profilePic'))
  async signUp(@Request() req: any, @UploadedFile() file: Express.Multer.File, @Body() renter: CreateUserDTO) {
    const { fileValidationError } = req;

    return this.tenantService.createTenant(renter, file, fileValidationError);
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { user } = req;
    return this.tenantService.findTenantByUname(user.username);
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('updateTenant')
  async updateTenant(@Request() req, @Body() updateUser: UpdateUserDTO) {
    const { user } = req;
    return this.tenantService.updateTenant(user.id, updateUser);
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('changePassTenant')
  async changePassTenant(
    @Request() req,
    @Body() changePassword: ChangePasswordDTO,
  ) {
    const { user } = req;
    return this.tenantService.changePassTenant(user.id, changePassword.password);
  }

  @Roles(Role.TENANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteTenant')
  async deleteTenant(@Request() req) {
    const { user } = req;
    return this.tenantService.deleteTenant(user.id);
  }
}
