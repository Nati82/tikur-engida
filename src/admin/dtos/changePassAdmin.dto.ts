import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePassAdminDTO {
  @ApiProperty()
  @IsString()
  password: string;
}
