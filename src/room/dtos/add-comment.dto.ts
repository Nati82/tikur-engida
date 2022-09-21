import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class AddCommentDTO {

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsUUID()
  tenantId: any;

  @ApiProperty()
  @IsUUID()
  roomId: any;
}
