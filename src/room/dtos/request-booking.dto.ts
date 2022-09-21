import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString, IsUUID } from 'class-validator';

export class RequestBookingDTO {
  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsUUID()
  roomId: any;

  @ApiProperty()
  @IsUUID()
  renterId: any;

  @ApiProperty()
  @IsUUID()
  tenantId: any;

  @ApiProperty()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsDateString()
  to: Date;
}
