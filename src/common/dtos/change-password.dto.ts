import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty()
  @IsString()
  password: string;
}
