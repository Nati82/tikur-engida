import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;
}
