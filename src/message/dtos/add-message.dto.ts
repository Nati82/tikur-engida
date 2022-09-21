import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class AddMessageDTO {
  @ApiProperty()
  @IsUUID()
  senderId: string;

  @ApiProperty()
  @IsUUID()
  receiverId: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  senderRole: string;

  @ApiProperty()
  @IsString()
  receiverRole: string;
}
