import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class MarkAsSeenDTO {
  @ApiProperty()
  @IsArray()
  messageIds: string[];
}
