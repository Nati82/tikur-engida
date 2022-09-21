import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateMessageDTO {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsBoolean()
  seen: string;
}
