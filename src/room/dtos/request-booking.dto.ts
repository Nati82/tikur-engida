import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class RequestBookingDTO {
  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsUUID()
  renterId: string;

  @ApiProperty()
  @IsUUID()
  tenantId: string;

  @ApiProperty()
  @IsDate()
  from: Date;

  @ApiProperty()
  @IsDate()
  to: Date;
}
