import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class UpdateRenterDTO {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
