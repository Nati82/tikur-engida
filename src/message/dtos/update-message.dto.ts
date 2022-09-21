import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMessageDTO {
  @ApiProperty()
  @IsString()
  message: string;
}
