import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAdminDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  password: string;
}
